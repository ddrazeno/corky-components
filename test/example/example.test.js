import { assert, expect } from 'chai';
import { Example } from '../../dist/example/element'
import { Service } from 'corky/flux/service';
import { registerService, registerElement } from 'corky/tags/template';
import * as tag from '../../dist/example/tag'
import App from 'corky/app'
import Flux from 'corky/flux'

describe('Example', () => {

    var app;

    var changeTitle = new Flux.Action('TITLE_CHANGED');

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

    beforeEach(() => {

        var dummyReducer = new Flux.Reducer([
            {
                action: changeTitle,
                reduce: (state, payload) => {
                    state.title = payload;
                }
            }
        ], { title: "Corky" })

        app = new App(dummyReducer);

        var tags = { a: tag };

        registerElement(Example, 'a', tags)
        registerService(Example, new DummyService())

        app.init("#app", Example);
    });

        it('Renders', () => {
            assert(document.getElementById('app').innerHTML, "<div> Corky </div>");
        });

        it('Changes', () => {
            app.dispatch(changeTitle.payload('Shamoo'))
            assert(document.getElementById('app').innerHTML, "<div> Shamoo </div>");
        });

    });