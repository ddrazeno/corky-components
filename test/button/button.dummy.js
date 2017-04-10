import Flux from 'corky/flux';
import { Service } from 'corky/flux/service';
import { registerService, registerElement } from 'corky/tags/template';
import App from 'corky/app';
import * as tag from '../../dist/button/tag'
import { Button } from '../../dist/button/element'

if(window) window.Dummy = Dummy;

export const clickMe = new Flux.Action('CLICK_ME');

export default function Dummy() {

    class DummyService extends Service {

        constructor() {
            super();
            this.selector = (state) => (
                {
                    text: state.text
                });
            this.isContainer = true;
        }
    }

    var dummyReducer = new Flux.Reducer([
        {
            action: clickMe,
            reduce: (state, payload) => {
                state.text = payload;
            }
        }
    ], { text: "Corky" })

    var app = new App(dummyReducer);

    var tags = { a: tag };

    registerElement(Button, 'a', tags)
    registerService(Button, new DummyService())

    app.init("#app", Button);

    return app;
}