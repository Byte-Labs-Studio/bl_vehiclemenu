import { Receive } from "@enums/events";
import { NuiService } from "@services/nui.service";
import { Icons, Option } from "@typings/options";

let options: Option[] = [];

export function addOptions() {
    // make a varaible x that is a random value inside the screen
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = Math.random() * width;
    const y = Math.random() * height;

    const icon = Icons[Math.floor(Math.random() * Icons.length)];

    const newOption: Option = {
        bone: 9100,
        icon: icon,
        x: x,
        y: y,
        active: false,
    }
    options = options.concat(newOption);

    NuiService.DebugEventSend(Receive.update, options)
}

export function addOption(icon: string) {
    // make a varaible x that is a random value inside the screen
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 100;

    const x = (Math.random() * width) + 50;
    const y = (Math.random() * height) + 50;

    const newOption: Option = {
        bone: 9100,
        icon: icon,
        x: x,
        y: y,
        active: false,
    }
    options = options.concat(newOption);
    NuiService.DebugEventSend(Receive.update, options)
}
    

export function removeOption() {
    options.pop();

    NuiService.DebugEventSend(Receive.update, options)
}
