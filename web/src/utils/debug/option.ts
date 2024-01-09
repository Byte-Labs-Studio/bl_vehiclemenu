import { Receive } from "@enums/events";
import { Icons, Option } from "@typings/option";
import { DebugEventSend } from "@utils/eventsHandlers";

let options: Option[] = [];

export function addOptions() {
    // make a varaible x that is a random value inside the screen
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = Math.random() * width;
    const y = Math.random() * height;

    const icon = Icons[Math.floor(Math.random() * Icons.length)];

    const newOption: Option = {
        icon: icon,
        x: x,
        y: y,
        active: false,
        index: options.length,
        type: "debug",
        boneName: "test",
    }
    options = options.concat(newOption);

    DebugEventSend(Receive.update, options)
}

export function addOption(icon: string) {
    // make a varaible x that is a random value inside the screen
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 100;

    const x = (Math.random() * width) + 50;
    const y = (Math.random() * height) + 50;

    const newOption: Option = {
        icon: icon,
        x: x,
        y: y,
        active: false,
        index: options.length,
        type: "debug",
        boneName: "test",
    }
    options = options.concat(newOption);
    DebugEventSend(Receive.update, options)
}
    

export function removeOption() {
    options.pop();

    DebugEventSend(Receive.update, options)
}
