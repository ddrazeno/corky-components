import { assert, expect } from 'chai';
import Flux from 'corky/flux';
import Dummy, {changeTitle} from './example.dummy';

describe('Example', () => {

    var app;
    
    

    beforeEach(() => {

        app = Dummy();
    });

        it('Renders', () => {
            assert(document.getElementById('app').innerHTML, "<div> Corky </div>");
        });

        it('Changes', () => {
            app.dispatch(changeTitle.payload('Shamoo'))
            assert(document.getElementById('app').innerHTML, "<div> Shamoo </div>");
        });

    });