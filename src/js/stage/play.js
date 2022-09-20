import * as me from 'melonjs/dist/melonjs.module.js';

export default class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // load a level
        me.level.load('area01');
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {}
}
