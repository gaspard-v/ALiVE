import * as Phaser from 'phaser';
import PlayScene from './src/scenes/PlayScene';
import MainMenuScene from './src/scenes/MainMenu';

const config = {
    name: 'ALiVE',
    type: Phaser.AUTO,
    backgroundColor: '#282828',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
    autoCenter: true,
    antialias: true,
    autoFocus: true,
    scene: [MainMenuScene],
};

window.game = new Phaser.Game(config);
