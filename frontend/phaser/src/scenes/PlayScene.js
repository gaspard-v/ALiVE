import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    luxmeterName;
    constructor() {
        super({ key: 'PlayScene', active: true });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.png');
        this.load.image('mGlass', '/static/mglass.png');
        this.load.image('exterior1', '/static/exterior1.jpg');
        this.load.text('luxmeterTitle', '/static/luxmeterTitle.txt');
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
            .image(game.config.width / 2, game.config.height / 2, 'mGlass')
            .setInteractive({ useHandCursor: true });

        this.luxmeterName = this.add.text(game.config.width / 2 - 100, game.config.height / 2 - 190, this.cache.text.get('luxmeterTitle'), { fontFamily: 'Arial', fontSize: 32, color: 'white'}).setVisible(false);

        const darkColor = new Phaser.Display.Color(0, 0, 0);

        this.infosRectangle  = this.add.rectangle(
            game.config.width / 2 - 40,
            game.config.height / 2 - 170,
            200,
            40,
            darkColor
        )
            .setAlpha(0.3)
            .setData(this.luxmeterName)
            .setVisible(false);

        this.luxmeter.on('pointerup', () => this.displayText());
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

    update() {
        this.luxmeter.on('pointerover', () => {
            this.infosRectangle.setVisible(true);
            this.luxmeterName.setVisible(true);
            setTimeout(() => 20000);
        });
        this.luxmeter.on('pointerout', () => {
            this.infosRectangle.setVisible(false);
            this.luxmeterName.setVisible(false);
        });
    }
}
