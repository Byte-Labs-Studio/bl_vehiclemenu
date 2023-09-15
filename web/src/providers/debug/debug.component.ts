import { Component, OnInit } from '@angular/core'
import { DebugItem } from '@typings/debugEvent'
import { NuiService } from '@services/nui.service'
import SendDebuggers from './debuggers/senders'
import ReceiveDebuggers from './debuggers/receivers'
import InitDebug from './debuggers/init'

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
})
export class DebugComponent implements OnInit {
    browserMode: boolean = NuiService.isBrowserMode
    menuOpen: boolean = false

    debugList: DebugItem[] = []

    constructor() {}

    toggleDebug(): void {
        if (!this.browserMode) {
            this.menuOpen = false
            return
        }
        this.menuOpen = !this.menuOpen
    }

    private initialiseDebugSenders(): void {
        for (const debug of InitDebug) {
            setTimeout(() => {
                debug.action()
            }, debug.delay || 0)
        }
    }

    private initialiseDebugReceivers(): void {
        for (const debug of ReceiveDebuggers) {
            NuiService.DebugEventReceive(debug.action, debug.handler)
        }
    }

    ngOnInit() {
        if (!this.browserMode) return

        this.initialiseDebugSenders()

        this.initialiseDebugReceivers()

        this.debugList = SendDebuggers
    }
}
