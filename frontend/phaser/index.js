import * as Phaser from 'phaser';
import PlayScene from './src/scenes/PlayScene';
import TextScene from './src/scenes/TextScene';
import MainMenu from './src/scenes/MainMenu';
import GrayScalePipelinePlugin from 'phaser3-rex-plugins/plugins/grayscalepipeline-plugin.js';
import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin.js';

const config = {
    name: 'ALiVE',
    type: Phaser.AUTO,
    backgroundColor: '#282828',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'ALiVE',
        width: 1920,
        height: 1080,
    },
    dom: {
        createContainer: true,
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
            {
                key: 'rexKawaseBlurPipeline',
                plugin: KawaseBlurPipelinePlugin,
                start: true,
            },
        ],
    },
    scene: [MainMenu, PlayScene, TextScene],
};

window.game = new Phaser.Game(config);