import * as Phaser from 'phaser';
import PlayScene from './src/scenes/PlayScene';
import TextScene from './src/scenes/TextScene';
import GrayScalePipelinePlugin from 'phaser3-rex-plugins/plugins/grayscalepipeline-plugin.js';

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
