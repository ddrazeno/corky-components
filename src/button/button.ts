import { Element } from 'corky/tags/Element';
export interface IButton {
    text: string;
    icons: { pre: string };
    disabled: boolean;
    hidden: boolean;
    onclick(event: MouseEvent): void;
}
export abstract class Button extends Element implements IButton {
    text: string;
    icons: { pre: string };
    disabled: boolean;
    hidden: boolean;
    abstract onclick(event: MouseEvent);

    constructor(){
        super();
    };

}
