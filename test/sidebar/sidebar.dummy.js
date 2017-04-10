import Flux from 'corky/flux';
import { Service } from 'corky/flux/service';
import { registerService, registerElement } from 'corky/tags/template';
import App from 'corky/app';
import * as tag from '../../dist/sidebar/tag'
import { Sidebar } from '../../dist/sidebar/element'

if(window) window.Dummy = Dummy;

export const toggleSide = new Flux.Action('TOGGLE_SIDE');

export default function Dummy() {

    class DummyService extends Service {

        constructor() {
            super();
            this.selector = (state) => (
                {
                    
                });
            this.actions = {
                toggle: () => tick.payload()
            }
            this.isContainer = true;
        }
    }

    var dummyReducer = new Flux.Reducer([
        {
            action: toggleSide,
            reduce: (state, payload) => {
                
            }
        }
    ], )

    var app = new App(dummyReducer);

    var tags = { a: tag };

    registerElement(Sidebar, 'a', tags)
    registerService(Sidebar, new DummyService())

    app.init("#app", Sidebar);

    return app;
}