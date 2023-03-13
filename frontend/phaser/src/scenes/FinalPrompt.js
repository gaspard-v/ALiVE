import * as Phaser from "phaser";
import { Button } from "../gameObjects/mainMenu/Button";

export class FinalPrompt extends Phaser.Scene{
    constructor(handle,finalItems){
        super(handle)
        this.finalItems = finalItems;
    }
    preload(){
        this.load.image('finalBack','/static/assets/images/menu/finalRectangle.png');
        this.load.image('finalButton','/static/assets/images/menu/reloadGame.png');
        this.load.image('finalLabel','/static/assets/images/menu/finalLabel.png');
    }

    create(){
        const {width,height} = this.scale;
        const back = this.add.sprite(width/2,height/2,'finalBack')
        back.setScale(width/back.width)

        let yObject = height/2 - 50;
        let xObject = (width/2) - (270);
        
        this.finalItems.forEach(element => {
            const frame = this.add.sprite(0,0,'itemFrame')
            xObject = xObject+frame.width*1.2;
            if(element.object){
                const object = this.add.sprite(xObject,yObject,'image_'+element.object);
                object.setScale((frame.height/object.height)*0.7)
            }
            frame.setPosition(xObject,yObject);
        })
        const finalLabel = this.add.sprite(width/2,(height/2) - 200,'finalLabel');
        const lastButton = new Button(width/2,800,'finalButton',this,()=>{this.onClick()},1.5);
    }
    onClick(){
    location.reload()
    }
}