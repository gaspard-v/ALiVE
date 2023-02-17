import * as Phaser from 'phaser';
import { Button } from '../gameObjects/mainMenu/Button';
import Places from "./Places";

export default class PromptRoom extends Phaser.Scene{
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor(handle,parentScene,placeData){
        super(handle)
        this.parentScene = parentScene;
        this.texteData = placeData.name;
        this.place = placeData
    }

    preload(){
    }
    create(){

        const {width,height} = this.scale;
    
        this.add.sprite(width/2,height/2,'promptBackground')
            .setAngle(90)
            .setScale(6);
            // .setAlpha(0.5);
        const closeButton = this.add
            .image(width - width/4, 100, 'closeIcon')
            .setInteractive({ useHandCursor: true });

            closeButton.on('pointerdown', () => this.stopScene());


        this.texte = this.add.text(
            width / 4,
            height / 4,
            this.texteData,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 64,
                color: '#000000'
            }
        )

        const validation = new Button(
            width/2,
            height-100,
            'placeValidationButton',
            this,
            () =>{this.chargePlace(
                this.place
            )},
            1
        )

    }
    chargePlace(placeData){

        // Verify if the scene exists in the scene 
        
        if (this.scene.isActive(placeData.uuid) === null){
            const place = new Places(placeData.uuid, placeData.rooms);
            this.scene.add(placeData.key,place,true);
        }

        this.scene.start(placeData.key);
        this.scene.remove();
    }

    stopScene() {
        this.scene.start(this.parentScene)
    }
}