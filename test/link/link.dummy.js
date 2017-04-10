import Flux from 'corky/flux';
import { Service } from 'corky/flux/service';
import { registerService, registerElement } from 'corky/tags/template';
import App from 'corky/app';
import * as tag from '../../dist/link/tag'
import { Link } from '../../dist/link/element'

if(window) window.Dummy = Dummy;

export const openLink = new Flux.Action('OPEN_LINK');

export default function Dummy() {

    class DummyService extends Service {

        constructor() {
            super();
            this.selector = (state) => (
                {
                    text: state.text,
                    href: state.href
                });
            
            this.isContainer = true;
        }
    }

    var dummyReducer = new Flux.Reducer([
        {
            action: openLink,
            reduce: (state, payload) => {
                state.text,
                state.href;
            }
        }
    ], { text: "Link", href: "https://acceleratio.net/" })

    var app = new App(dummyReducer);

    var tags = { a: tag };

    registerElement(Link, 'a', tags)
    registerService(Link, new DummyService())

    app.init("#app", Link);

    return app;
}