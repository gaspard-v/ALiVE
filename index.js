import * as Phaser from 'phaser';
import PlayScene from './src/scenes/PlayScene';
import MainMenuScene from './src/scenes/MainMenu';

const ratio = Math.max(
    window.innerWidth / window.innerHeight,
    window.innerHeight / window.innerWidth
);
const DEFAULT_HEIGHT = 720; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

const config = {
    name: 'ALiVE',
    type: Phaser.AUTO,
    backgroundColor: '#282828',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    autoCenter: true,
    antialias: true,
    autoFocus: true,
    plugins: {
        global: [
            {
                key: 'rexGrayScalePipeline',
                plugin: GrayScalePipelinePlugin,
                start: true,
            },
        ],
    },
    scene: [PlayScene, TextScene],
};

window.game = new Phaser.Game(config);
