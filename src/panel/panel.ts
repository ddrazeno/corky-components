import { Element } from 'corky/tags/Element';

export interface IPanel{
    icons: {
        left: string, 
        right: string
    };

    text: string;
    direction:{ 
        left: string,  
        right: string 
    };
    collapsed: boolean;
    toggle(): void;
}

export abstract class Panel extends Element implements IPanel{
    icons: {
        left: string, 
        right: string
    };

    text: string;
    direction:{ 
        left: string, 
        right: string
    };
    collapsed: boolean;
    abstract toggle(): void;
    
    constructor(){
        super();
    };
}