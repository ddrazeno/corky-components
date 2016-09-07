export interface ILink{
    text: string;
    icons: {pre: string};
    disabled: boolean;
    hidden: boolean;
    href: string;
}

export abstract class Link extends Element implements ILink{
    text: string;
    icons: {pre: string};
    disabled: boolean;
    hidden: boolean;
    href: string;
}