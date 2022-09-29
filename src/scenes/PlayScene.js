import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene', active: true });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.jfif');
    }

    displayScene() {
        this.scene.start('TextScene');
        this.scene.stop('PlayScene');
        this.plugins.get('rexGrayScalePipeline').add(this.cameras.main, {
            intensity: 1,
        });
    }

    create() {
        this.scene.bringToTop();
        const luxmeter = this.add
            .image(game.config.width / 2, game.config.height / 2, 'luxmetre')
            .setInteractive({ useHandCursor: true });

        luxmeter.on('pointerup', () => this.displayScene());
        this.texteScene = this.scene.get('TextScene');
    }
}
