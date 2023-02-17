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
            this.load.image('closeIcon','/static/assets/images/utils/close2.png')
            this.load.image('promptBackground','/static/assets/images/utils/papyrus.jfif');
            this.load.image('placeValidationButton','/static/assets/images/menu/placeValidationButton.png')
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
        if (!this.scene.isActive(placeData.uuid)){
            const place = new Places(placeData.uuid, placeData.rooms);
            this.scene.add(placeData.key,place,true);
        }
        this.scene.stop();
        this.scene.bringToTop(placeData.key);
    }

    stopScene() {
        this.scene.bringToTop(this.parentScene);
    }
}