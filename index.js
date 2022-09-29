import * as Phaser from 'phaser';
import PlayScene from './src/scenes/PlayScene';
import TextScene from './src/scenes/TextScene';

const config = {
    name: 'ALiVE',
    type: Phaser.AUTO,
    backgroundColor: '#D3D3D3',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
    autoCenter: true,
    antialias: true,
    autoFocus: true,
    scene: [PlayScene],
};

window.game = new Phaser.Game(config);
