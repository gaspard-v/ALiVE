import * as Phaser from 'phaser';

export default class TextScene extends Phaser.Scene {
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor() {
        super({ key: 'TextScene', active: true });
    }

    preload() {
        this.load.text('luxmetreText', '/static/luxmetreText.txt');
        this.load.text('bottleText', '/static/bottleText.txt');
        this.load.image('closeIcon', '/static/close2.png');
    }

    stopScene() {
        const reactiveScene = this.data.values.reactiveScene;

        this.scene.stop();
        // const playScene = this.scene.get('PlayScene').scene;
        // playScene.setActive(true);
        // playScene.bringToTop();
        reactiveScene();
    }

    createRectangle = (
        x,
        y,
        width,
        height,
        radius,
        color,
        depth = undefined
    ) => {
        const graphics = this.add.graphics();
        graphics.fillStyle(color);
        const rectangle = graphics.fillRoundedRect(0, 0, width, height, radius);
        rectangle.setX(x);
        rectangle.setY(y);
        const closeButton = this.add
            .image(0, 0, 'closeIcon')
            .setInteractive({ useHandCursor: true });
        closeButton.setX(x + width - closeButton.width);
        closeButton.setY(y + closeButton.height);
        closeButton.on('pointerdown', () => this.stopScene());
    };

    create() {
        this.createRectangle(
            game.config.width / 8,
            game.config.height / 8,
            (game.config.width * 3) / 4,
            (game.config.height * 3) / 4,
            32,
            0x6666
        );

        this.texte = this.add.text(
            game.config.width / 4,
            game.config.height / 4,
            this.data.values.displayText,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 64,
            }
        );
    }
}
