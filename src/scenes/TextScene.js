import * as Phaser from 'phaser';

export default class TextScene extends Phaser.Scene {
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor() {
        console.log("Starting Textscene")
        super({ key: 'TextScene' });
    }

    preload() {
        this.load.text("luxmetreText", "/static/luxmetreText.txt");
    }

    create() {
        this.add.text(this.x, this.y, 'luxmetreText', {})
        //this.add.zone(this.x, this.y, this.windowWidth/4, this.windowHeight/4).setInteractive().setOrigin(0)
    }
}
