import { DebugAction } from '@typings/debugEvent'
import { toggleVisible } from './visibility'

/**
 * The initial debug actions to run on startup
 */
const InitDebug: DebugAction[] = [
    {
        label: 'Visible',
        action: () => toggleVisible(true),
        delay: 500,
    },
]

export default InitDebug
