import { Receive } from '@enums/events'
import { NuiService } from '@services/nui.service'

/**
 * The debug response for the visibility debug action.
 */
export function toggleVisible(visible: boolean): void {
    NuiService.DebugEventSend(Receive.visible, visible)
}
