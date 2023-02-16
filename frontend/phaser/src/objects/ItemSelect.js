import * as Phaser from 'phaser';

export default class ItemSelect{
    constructor(x,y,scene,objectTexture){
        const selector = scene.add.sprite(x,y,"itemFrame")
        .add(objectTexture);
    }

}