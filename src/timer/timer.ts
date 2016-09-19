import { Element } from 'corky/tags/Element';

export interface ITimer {
    time: number;
    tick(): void;
}

export abstract class Timer extends Element implements ITimer {
    time: number;
    abstract tick();

    constructor(){
        super();
        setInterval(()=>{
            this.tick();
        }, 1000)
    }
}