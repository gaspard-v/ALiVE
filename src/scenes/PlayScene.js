import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene', active: true });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.jfif');
        this.load.image('exterior1', '/static/exterior1.jpg');
    }

    displayScene() {
        // this.textScene.scene.start();
        // this.scene.sendToBack();
        // this.luxmeter.setInteractive({ useHandCursor: false });
        // this.plugins.get('rexGrayScalePipeline').add(this.cameras.main, {
        //     intensity: 1,
        // });
        console.log('print');
    }

    create() {
        this.scene.bringToTop();
        // this.textScene = this.scene.get('TextScene');
        // this.textScene.scene.stop();
        const exterior1 = this.add.image(
            game.config.width / 2,
            game.config.height / 2,
            'exterior1'
        );
        const luxmeter = this.add
            .image(game.config.width / 2, game.config.height / 2, 'luxmetre')
            .setInteractive({ useHandCursor: true });

        //this.luxmeter.on('pointerup', () => this.displayScene());
        luxmeter.on('pointerdown', (pointer) => {
            console.log('pointerdown');
        });
        luxmeter.on('pointerup', (pointer) => {
            console.log('pointerup');
        });
    }
}
