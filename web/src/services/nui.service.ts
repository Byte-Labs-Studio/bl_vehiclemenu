import { Injectable, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { NuiMessage } from '@typings/nuiMessage'
import { SubscriptionManager } from '@utils/subscriptionManager'

const RESOURCE_NAME = 'bl_angular_template'

@Injectable({
    providedIn: 'root',
})

/**
 * A service to handle communication between the Client and the Browser
 * @class
 * @classdesc This service is used to send and receive events between the Client and the Browser.
 * @example
 * Send an event to the Client
 * NuiService.SendEvent('myEvent', { myData: 'Hello World!' })
 * 
 * Listen for an event from the Client
 * NuiService.ReceiveEvent('myEvent', (data) => {
 *    console.log(data.myData) // Hello World!
 * })
 * 
 * Emulate an event sent from the Client
 * NuiService.DebugEventSend('myEvent', { myData: 'Hello World!' })
 * 
 * Emulate an NUICallback in the Client
 * NuiService.DebugEventReceive('myEvent', (data) => {
 *   console.log(data.myData) // Hello World!
 *  return { myData: 'Hello World!' }
 * })
 * 
 */
export class NuiService implements OnDestroy {
    private eventListeners: SubscriptionManager = new SubscriptionManager()

    private static debugEventListeners: any = {}

    private static resourceName = NuiService.GetResourceName()

    /**
     * Get the set resource name. Defaults to bl_vehiclemenu
     * @returns {string} The resource name
     */
    public static GetResourceName() {
        return (window as any).GetParentResourceName
            ? (window as any).GetParentResourceName()
            : RESOURCE_NAME
    }

    /**
     * Get the current environment. Whether it's the browser or the client
     */
    public static IsEnvBrowser = (): boolean => !(window as any).invokeNative

    public static readonly isBrowserMode = NuiService.IsEnvBrowser()

    /**
     * Send an event to the Client
     * @param eventName The name of the event to send
     * @param data The data to send with the event
     * @returns {Promise<T>} The callback response from the Client
     **/
    public static async SendEvent<T = any>(
        eventName: string,
        data: T = {} as T
    ): Promise<T> {
        const browserMode = NuiService.isBrowserMode

        if (browserMode == true) {
            const debugReturn = await NuiService.DebugEventCallback<T>(eventName, data)
            return Promise.resolve(debugReturn)
        }
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
        }

        const resp: Response = await fetch(
            `https://${NuiService.resourceName}/${eventName}`,
            options
        )
        return await resp.json()
    }

    /**
     * Listen for an event from the Client
     * @param action The name of the event to listen for
     * @param handler The callback to run when the event is received
     * @returns {void}
     **/
    public ReceiveEvent<T = unknown>(action: string, handler: (data: T) => void) {
        const eventListener = (event: MessageEvent<NuiMessage<T>>) => {
            const { action: eventAction, data } = event.data

            eventAction === action && handler(data)
        }

        // Add the event listener and track the subscription for later cleanup
        window.addEventListener('message', eventListener)

        this.eventListeners.Add = new Subscription(() =>
            window.removeEventListener('message', eventListener)
        )
    }

    /**
     * Emulate an event sent from the Client
     * @param action The name of the event to send
     * @param data The data to send with the event
     * @param timer The time to wait before sending the event (in ms)
     * @returns {void}
     **/
    public static async DebugEventSend<P>(action: string, data?: P, timer = 0) {
        if (!NuiService.isBrowserMode) return
        setTimeout(() => {
            const event = new MessageEvent('message', {
                data: { action, data },
            })
            window.dispatchEvent(event)
        }, timer)
    }

    /**
     * Emulate an NUICallback in the Client
     * @param action The name of the event to listen for
     * @param handler The callback to run when the event is received
     * @returns {void}
     **/
    public static async DebugEventReceive<T>(
        action: string,
        handler?: (data: T) => unknown,
    ) {
        if (!NuiService.isBrowserMode) return

        if (NuiService.debugEventListeners[action] !== undefined) {
            console.log(
                `%c[DEBUG] %c${action} %cevent already has a debug receiver.`,
                'color: red; font-weight: bold;',
                'color: green',
                '', // Empty CSS style string to reset the color
            );
            return
        }

        NuiService.debugEventListeners[action] = handler
    }

    /**
     * Emulate an NUICallback in the Client
     * @private
     * @param action The name of the event to listen for
     * @param data The data to send with the event
     * @returns {Promise<T>} The callback response from the Client
     */
    private static async DebugEventCallback<T>(action: string, data?: T) {
        if (!NuiService.isBrowserMode) return

        const handler = NuiService.debugEventListeners[action]
        if (handler === undefined) {
            console.log(`[DEBUG] ${action} event does not have a debugger.`)
            return {}
        }

        const result = await handler(data)
        return result
    }

    /**
     * Clean up all subscriptions inside the component when it unmounts.
     */
    ngOnDestroy(): void {
        // Clean up all subscriptions when the service is destroyed
        this.eventListeners.Dispose()
    }
}
