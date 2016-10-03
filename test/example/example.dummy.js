import Flux from 'corky/flux';
import { Service } from 'corky/flux/service';
import { registerService, registerElement } from 'corky/tags/template';
import App from 'corky/app';
import * as tag from '../../dist/example/tag'
import { Example } from '../../dist/example/element'

if(window) window.Dummy = Dummy;

export const changeTitle = new Flux.Action('TITLE_CHANGED');

export default function Dummy() {

    class DummyService extends Service {

        constructor() {
            super();
            this.selector = (state) => (
                {
                    title: state.title
                });
            this.isContainer = true;
        }
    }

    var dummyReducer = new Flux.Reducer([
        {
            action: changeTitle,
            reduce: (state, payload) => {
                state.title = payload;
            }
        }
    ], { title: "Corky" })

    var app = new App(dummyReducer);

    var tags = { a: tag };

    registerElement(Example, 'a', tags)
    registerService(Example, new DummyService())

    app.init("#app", Example);

    return app;
}