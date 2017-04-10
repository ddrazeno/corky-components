import { Element } from 'corky/tags/Element';
export interface ILink {
    text: string;
    icons: {
        pre: string;
    };
    selected: boolean;
    hidden: boolean;
    disabled: boolean;
    href: string;
}
export abstract class Link extends Element implements ILink {
    text: string;
    icons: {
        pre: string;
    };
    selected: boolean;
    hidden: boolean;
    href: string;
    disabled: boolean;

    constructor(){
        super();
    };
}