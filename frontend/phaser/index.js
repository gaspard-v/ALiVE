import * as Phaser from 'phaser';
import {MainMenu} from "./src/scenes/Main";

const config = {
    name: 'ALiVE',
    type: Phaser.AUTO,
    backgroundColor: '#282828',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
      },
    dom: {
        createContainer: true,
    },
    scene: [MainMenu],
};

var game = new Phaser.Game(config);
