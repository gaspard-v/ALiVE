import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.jfif');
    }

    create() {
        this.add.image(game.config.width / 2, game.config.height / 2, 'luxmetre');
    }
}
