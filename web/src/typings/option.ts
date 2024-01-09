export interface Option {
    icon: string;
    x: number;
    y: number;
    index: number;
    type: string;
    boneName: string;
    active: boolean;
    visible: boolean;
}

export const Icons: string[] = [
    'doorl',
    'doorr',
    'hood',
    'trunk',
    'windowl',
    'windowr',
    'engine',
    'root',
    'seat'
]

export interface MenuOptionType {
    value: string;
    icon: string;
}