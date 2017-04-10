import { Element } from 'corky/tags/Element';
import { ILink } from '../../dist/link/element';
export interface ISideBar{
    icons: {
        menu: string
    };
    nodes: Array<ILink>;
    collapsed: boolean;
    toggle(): void;
}

export abstract class SideBar extends Element implements ISideBar{
    icons: {
        menu: string
    };
    nodes: Array<ILink>;
    collapsed: boolean;
    abstract toggle(): void;

    constructor(){
        super();
    };
}