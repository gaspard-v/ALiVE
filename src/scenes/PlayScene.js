import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene', active: true });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.jfif');
        // scene.load.plugin(
        //     'rexgrayscalepipelineplugin',
        //     'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgrayscalepipelineplugin.min.js',
        //     true
        // );
    }

    displayScene() {
        this.scene.start('TextScene');
        this.scene.stop('PlayScene');
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
