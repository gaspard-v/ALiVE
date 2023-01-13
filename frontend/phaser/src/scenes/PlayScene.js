import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene'});
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.jfif');
        this.load.image('exterior1', '/static/exterior1.jpg');
    }

    displayText() {
        this.textScene.data.set('reactiveScene', this.reactiveScene.bind(this));
        this.textScene.scene.start();
        this.desactiveScene();
    }

    desactiveScene() {
        this.scene.setActive(false);
        this.scene.sendToBack();
        this.blur.active = true;
        this.darkRectangle.setVisible(true);
    }

    reactiveScene() {
        this.scene.setActive(true);
        this.scene.bringToTop();
        this.blur.active = false;
        this.darkRectangle.setVisible(false);
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
        this.exterior1 = this.add.image(
            game.config.width / 2,
            game.config.height / 2,
            'exterior1'
        );
        this.luxmeter = this.add
            .image(game.config.width / 2, game.config.height / 2, 'luxmetre')
            .setInteractive({ useHandCursor: true });

        this.luxmeter.on('pointerup', () => this.displayText());
        const darkColor = new Phaser.Display.Color(0, 0, 0);
        this.darkRectangle = this.add
            .rectangle(
                game.config.width / 2,
                game.config.height / 2,
                game.config.width,
                game.config.height,
                darkColor
            )
            .setAlpha(0.7)
            .setVisible(false);
    }
}
