import * as Phaser from 'phaser';

export default class PromptObject extends Phaser.Scene{
    constructor(handle){
        super(handle)
    }
    preload(){

    }
    create(){
        const {width,height} = this.scale;
        this.add.sprite(width/2,height/2,'green')
            .setAlpha(0.5)
            .setScale(5)
            .setAngle(90)
            



    }

}