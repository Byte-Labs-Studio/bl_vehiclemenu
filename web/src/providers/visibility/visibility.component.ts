import { Component, HostListener, OnInit } from '@angular/core'
import { Receive, Send } from 'src/enums/events'
import { NuiService } from 'src/services/nui.service'

@Component({
    selector: 'app-visiblity',
    template: `
        <main *ngIf="visible">
            <ng-content></ng-content>
        </main>
    `,
    styles: [
        `
            main {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 100;
                user-select: none;
                box-sizing: border-box;
                padding: 0;
                margin: 0;
                height: 100vh;
                width: 100vw;
            }
        `,
    ],
})

export class VisibilityComponent implements OnInit {
    visible = false

    constructor(private readonly nui: NuiService) {}

    ngOnInit() {
        this.nui.ReceiveEvent(Receive.visible, (visible: boolean): void => {
            this.visible = visible
        })
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (['Backspace', 'Escape'].includes(event.code)) {
            // Handle the keydown event as needed
            NuiService.SendEvent(Send.close)
        }
    }
}
