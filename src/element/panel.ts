import { Element } from 'corky/tags/Element';

export interface IPanel{
    icons:{left: string, right: string};
    text: string;
    direction: "left" | "right";
    collapsed: boolean;
    toogle: () => void;
}

export abstract class Panel extends Element implements IPanel{
    icons:{left: string, right: string};
    text: string;
    direction: "left" | "right";
    collapsed: boolean;


    toogle: () => {

    };

    
}