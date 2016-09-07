import { Element } from 'corky/tags/Element';
import { ILink } from './link';

export interface ISidebar{
    icons:{ menu: string };
    nodes: Array<ILink>;
    collapsed: boolean;
    toggle:() => void;
}

export abstract class SideBar extends Element implements ISidebar{
    icons:{ menu: string };
    nodes: Array<ILink>;
    collapsed: boolean;
    toggle:() => void;
}

