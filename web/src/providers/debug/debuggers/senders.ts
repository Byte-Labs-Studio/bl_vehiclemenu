import { DebugItem } from '@typings/debugEvent'
import { toggleVisible } from './visibility'
import { NuiService } from '@services/nui.service'
import { Send } from '@enums/events'
import { addOption, addOptions, removeOption } from './options'

/**
 * The debug actions that will show up in the debug menu.
 */
const SendDebuggers: DebugItem[] = [
    {
        label: 'Visibility',
        actions: [
            {
                label: 'True',
                action: () => toggleVisible(true),
            },
            {
                label: 'False',
                action: () => toggleVisible(false),
            },
        ],
    },
    {
        label: 'Options',
        actions: [
            {
                label: 'Add',
                action: () => addOptions(),
            },
            {
                label: 'Remove',
                action: () => removeOption(),
            },
        ],
    },
    {
        label: 'Option',
        actions: [
            {
                label: 'Icon',
                action: addOption,
                type: 'text',
                placeholder: 'Icon',
            },
        ],
    },
    
    // {
    //     label: 'Slider',
    //     actions: [
    //         {
    //             label: 'Change Value',
    //             action: (value: number) =>
    //                 NuiService.DebugEventSend(Send.imageResize, value),
    //             value: 50,
    //             type: 'slider',
    //         },
    //     ],
    // },
    // {
    //     label: 'Checkbox',
    //     actions: [
    //         {
    //             label: 'Toggle',
    //             action: (value: number) =>
    //                 NuiService.DebugEventSend(Send.imageInvert, value),
    //             value: false,
    //             type: 'checkbox',
    //         },
    //     ],
    // },
    // {
    //     label: 'Text',
    //     actions: [
    //         {
    //             label: 'Type',
    //             action: (value: string) =>
    //                 NuiService.DebugEventSend(Send.changeText, value),
    //             type: 'text',
    //             placeholder: 'Type here',
    //         },
    //     ],
    // },
    // {
    //     label: 'Button',
    //     actions: [
    //         {
    //             label: 'Reset Text',
    //             action: () => NuiService.DebugEventSend(Send.resetText),
    //         },
    //     ],
    // },

    // {
    //     label: 'Debug receiver example.',
    //     actions: [
    //         {
    //             label: 'Emulates a POST To Client and get back a response.',
    //             type: 'text',
    //             placeholder: 'Type text to reverse.',
    //             action: (value: string) => NuiService.SendEvent("debug", value).then((reversed: string) => console.log(reversed,'color: red', 'color: white', 'color: green')),
    //         },
    //     ],
    // },
]

export default SendDebuggers
