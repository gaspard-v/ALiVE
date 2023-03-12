import {MainMenu} from "./src/scenes/Main";
import ScrollerPlugin from 'phaser3-rex-plugins/plugins/scroller-plugin';


const config = {
    name: 'ALiVE',
    type: Phaser.AUTO,
    backgroundColor: '#282828',
    scale : {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent:'game-container',
        width:1920,
        height:1080
    },
    dom: {
        createContainer: true,
    },
    plugins : {
        global : [
            {
                    key: 'rexScroller',
                    plugin: ScrollerPlugin,
                    start: true
            }
        ]
    },
    scene: [MainMenu],

};



var game = new Phaser.Game(config);

