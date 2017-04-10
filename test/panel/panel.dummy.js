import Flux from 'corky/flux';
import { Service } from 'corky/flux/service';
import { registerService, registerElement } from 'corky/tags/template';
import App from 'corky/app';
import * as tag from '../../dist/panel/tag'
import { Panel } from '../../dist/panel/element'

if(window) window.Dummy = Dummy;

export const panelToggle = new Flux.Action('PANEL_TOGGLE');

export default function Dummy() {

    class DummyService extends Service {

        constructor() {
            super();
            this.selector = (state) => (
                {
                    text: state.text
                });
            this.actions = {
                toggle: () => tick.payload()
            }
            this.isContainer = true;
        }
    }

    var dummyReducer = new Flux.Reducer([
        {
            action: panelToggle,
            reduce: (state, payload) => {
                state.text;
            }
        }
    ], { text: "" })

    var app = new App(dummyReducer);

    var tags = { a: tag };

    registerElement(Panel, 'a', tags)
    registerService(Panel, new DummyService())

    app.init("#app", Panel);

    return app;
}