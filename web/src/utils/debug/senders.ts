import { DebugItem } from '@typings/events'
import { toggleVisible } from './visibility'
import { Send } from '@enums/events'
import { DebugEventSend, SendEvent } from '@utils/eventsHandlers'
import { addOption, addOptions, removeOption } from './option'

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
]

export default SendDebuggers
