import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.jfif');
        this.load.text('luxmetreText', '/static/luxmetreText.txt');
    }

    showText(value) {
        console.log('I would to show a text.');
        this.add
            .text(game.config.width / 2, game.config.height / 2, 'luxmetreText')
            .setVisible(value);
        console.log('End of showText method.');
    }

    reverseText(texte) {
        // let val = this.add.text(
        //     game.config.width / 2,
        //     game.config.height / 2,
        //     'luxmetreText'
        // ).visible;
        // console.log('luxmetreText is visible : ' + val);
        // this.showText(!val);
        //texte.bringToTop();
        texte.setVisible(!texte.visible);
    }

    create() {
        const texte = this.add
            .text(0, 0, 'luxmetreText', {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            })
            .setVisible(false);
        const luxmeter = this.add
            .image(game.config.width / 2, game.config.height / 2, 'luxmetre')
            .setInteractive({ useHandCursor: true });

        luxmeter.on('pointerup', () => this.reverseText(texte));
    }
}
