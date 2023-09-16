import { Send } from "@enums/events"
import { DebugEventCallback } from "@typings/debugEvent"
import { Option } from "@typings/options"

/**
 * These Receivers will emulate what the client receives from the UI.
 * The purpose of this is to test the UI without having to run the client.
 * You are supposed to pretend to process the data you receive here and return.
 */
const ReceiveDebuggers: DebugEventCallback[] = [
    {
        action: 'close',
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
    // {
    //     action: 'debug',
    //     handler: (data: string) => {
    //         const init = 'Emulates an NUICallback times. Process the data here.'

    //         if (typeof data !== 'string') {
    //             return `${init} \n The data is not a string.`
    //         }

    //         const reverse = data.split('').reverse().join('')

    //         const message = `${init} \n The reverse of %c${data} %cis %c${reverse}`

    //         return message
    //     },
    // },
]

// RegisterNUICallback("debug", function(, cb)



// end)

export default ReceiveDebuggers
