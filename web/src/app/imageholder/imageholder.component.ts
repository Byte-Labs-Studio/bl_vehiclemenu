import { Component, OnInit } from '@angular/core'
import { Receive } from '@enums/events'
import { NuiService } from '@services/nui.service'

@Component({
    selector: 'app-imageholder',
    template: `
        <div
            class="w-screen h-screen absolute top-0 left-0"
        >
            <img
                [src]="
                    colInvert ? 'assets/TextWhite.png' : 'assets/TextBlack.png'
                "
                [ngStyle]="{
                    'width.vw': size
                }"
                class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit absolute"
                alt="Byte Labs Logo"
            />

            <h2
                [style.font-size.vw]="size / 10"
                [style.color]="colInvert ? 'white' : 'black'"
                class="text-center text-black font-semibold bottom-[25vh] left-1/2 font-[Pixeboy] -translate-x-1/2 h-fit absolute"
            >
                {{ text }}
            </h2>
        </div>
    `,
})
export class ImageholderComponent implements OnInit {
    size: number = 40
    colInvert: boolean = false
    text: string = 'Byte Labs'

    constructor(private readonly nui: NuiService) {}

    ngOnInit(): void {
        this.nui.ReceiveEvent(Receive.imageResize, (value: number) => {
            this.size = value
        })

        this.nui.ReceiveEvent(Receive.imageInvert, (bool: boolean) => {
            console.log(bool)
            this.colInvert = bool
        })

        this.nui.ReceiveEvent(Receive.changeText, (text: string) => {
            this.text = text
        })

        this.nui.ReceiveEvent(Receive.resetText, () => {
            this.text = 'Byte Labs'
        })
    }
}
