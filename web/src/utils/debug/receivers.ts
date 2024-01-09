import { Send } from "@enums/events"
import { DebugEventCallback } from "@typings/events"
import { Option } from "@typings/option"
import { DebugEventReceive } from "@utils/eventsHandlers"

/**
 * These Receivers will emulate what the client receives from the UI.
 * The purpose of this is to test the UI without having to run the client.
 * You are supposed to pretend to process the data you receive here and return.
 */
const ReceiveDebuggers: DebugEventCallback[] = [
    {
        action: Send.close,
        handler: () => {
            console.log('closed')
        },
    },
    {
        action: Send.click,
        handler: (option: Option) => {
            return !option.active
        },
    },
]

export default ReceiveDebuggers

/**
 * Initialise the debug receivers
 */
export function InitialiseDebugReceivers(): void {
    for (const debug of ReceiveDebuggers) {
        DebugEventReceive(debug.action, debug.handler)
    }
}
