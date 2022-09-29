import * as Phaser from 'phaser';

export default class TextScene extends Phaser.Scene {
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor() {
        console.log('Starting Textscene');
        super({ key: 'TextScene', active: true });
    }

    preload() {
        this.load.text('luxmetreText', '/static/luxmetreText.txt');
    }

    displayText() {
        const visible = this.scene.isVisible();
        if (visible) {
            this.scene.sendToBack();
        } else {
            this.scene.bringToTop();
        }
        this.scene.setVisible(!visible);
    }

    create() {
        this.scene.setVisible(false);

        this.rectangle = this.add.rectangle(
            game.config.width / 2,
            game.config.height / 2,
            (game.config.width * 3) / 4,
            (game.config.height * 3) / 4,
            0x6666
        );
        this.closeButton = this.add.text();
        this.texte = this.add.text(
            game.config.width / 2,
            game.config.height / 2,
            'luxmetreText',
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            }
        );
    }
}
