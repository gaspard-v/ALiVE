import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene', active: true });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.jfif');
        this.load.image('exterior1', '/static/exterior1.jpg');
    }

    displayText() {
        console.log('displayText');
        this.textScene.data.set('reactiveScene', this.reactiveScene.bind(this));
        this.textScene.scene.start();
        this.desactiveScene();
    }

    desactiveScene() {
        this.scene.setActive(false);
        this.scene.sendToBack();
        this.blur.active = true;
    }

    reactiveScene() {
        this.scene.setActive(true);
        this.scene.bringToTop();
        console.log('reactiveScene');
        this.blur.active = false;
    }

    create() {
        this.scene.bringToTop();
        this.textScene = this.scene.get('TextScene');
        this.textScene.scene.stop();
        this.blur = this.plugins
            .get('rexKawaseBlurPipeline')
            .add(this.cameras.main, {
                intensity: 1,
            });
        this.blur.active = false;
        const exterior1 = this.add.image(
            game.config.width / 2,
            game.config.height / 2,
            'exterior1'
        );
        this.luxmeter = this.add
            .image(game.config.width / 2, game.config.height / 2, 'luxmetre')
            .setInteractive({ useHandCursor: true });

        this.luxmeter.on('pointerup', () => this.displayText());
    }
}
