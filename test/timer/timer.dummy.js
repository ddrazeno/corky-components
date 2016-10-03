import Flux from 'corky/flux';
import { Service } from 'corky/flux/service';
import { registerService, registerElement } from 'corky/tags/template';
import App from 'corky/app';
import * as tag from '../../dist/timer/tag'
import { Timer } from '../../dist/timer/element'

if(window) window.Dummy = Dummy;

export const tick = new Flux.Action('TICK');

export default function Dummy() {

    class DummyService extends Service {

        constructor() {
            super();
            this.selector = (state) => (
                {
                    time: state.time
                });
            this.actions = {
                tick: () => tick.payload()
            }
            this.isContainer = true;
        }
    }

    var dummyReducer = new Flux.Reducer([
        {
            action: tick,
            reduce: (state, payload) => {
                state.time++;
            }
        }
    ], { time: 0 })

    var app = new App(dummyReducer);

    var tags = { a: tag };

    registerElement(Timer, 'a', tags)
    registerService(Timer, new DummyService())

    app.init("#app", Timer);

    return app;
}