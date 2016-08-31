import { Element } from 'corky/tags/Element';

export interface IExample {
    title: string;
}

export abstract class Example extends Element implements IExample {
    title: string;
}