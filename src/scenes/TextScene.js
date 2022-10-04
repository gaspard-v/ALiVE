import * as Phaser from 'phaser';

export default class TextScene extends Phaser.Scene {
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor() {
        console.log('Starting Textscene');
        super({ key: 'TextScene' });
    }

    preload() {
        this.load.text('luxmetreText', '/static/luxmetreText.txt');
        this.load.image('closeIcon', '/static/close.png');
    }

    stopScene() {
        this.scene.stop('TextScene');
        this.scene.start('PlayScene');
    }

    createRectangle = (x, y, height, width) => {};

    create() {
        // this.rectangle = this.add.rectangle(
        //     game.config.width / 2,
        //     game.config.height / 2,
        //     (game.config.width * 3) / 4,
        //     (game.config.height * 3) / 4,
        //     0x6666
        // );
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x6666);
        this.rectangle = this.graphics.fillRoundedRect(
            0,
            0,
            (game.config.width * 3) / 4,
            (game.config.height * 3) / 4,
            32
        );
        this.rectangle.setX(game.config.width / 8);
        this.rectangle.setY(game.config.height / 8);

        const buttonXPosition = this.rectangle.x;
        const buttonYPosition = this.rectangle.y;
        console.log(
            `${this.rectangle.x} ${this.rectangle.y} ${this.rectangle.z} ${this.rectangle.w}`
        );
        this.closeButton = this.add
            .image(buttonXPosition, buttonYPosition, 'closeIcon')
            .setInteractive({ useHandCursor: true });
        this.closeButton.on('pointerdown', () => this.stopScene());
        this.texte = this.add.text(
            game.config.width / 4,
            game.config.height / 4,
            "Ceci est le descriptif d'un luxmetre",
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            }
        );
    }
}
