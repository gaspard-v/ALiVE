import * as Phaser from 'phaser';
import {isReflectionDelayOver} from "./ReflectionButton.js"


export default class PromptObject extends Phaser.Scene{
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor(handle,parentScene,objectData){
        super(handle)
        this.parentSceneKey = parentScene;
        this.objectData = objectData;
        this.base64 = objectData.image;
    }
    preload(){
        this.load.image('closeIcon', '../../static/assets/images/utils/close2.png');
        this.load.image('promptBackground','../../static/assets/images/utils/papyrus.jfif');
    }
    
    stopScene() {
        this.scene.start(this.parentSceneKey)
        if (isReflectionDelayOver.bool == true) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton')
        }
    }
    
    create(){

        const {width,height} = this.scale;

        this.add.sprite(width/2,height/2,this.parentSceneKey)
        this.add.sprite(width/2,height/2,'promptBackground')
            //.setAngle(90)
            //.setScale(6);
            // .setAlpha(0.8);
        this.add.sprite(width/2,height/2,this.objectData["objectFile"])
            .setScale(0.7);

        const closeButton = this.add
            .image(width - width/4, 100, 'closeIconWhite')
            .setInteractive({ useHandCursor: true });

            closeButton.on('pointerdown', () => this.stopScene());

        this.titleText = this.add.text(
            width / 3,
            40,
            this.objectData.name,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 86,
                color: '#FFFFFF'
            }
        )

        this.texte = this.add.text(
            width / 4,
            height / 4,
            this.objectData.description,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 64,
                color: '#FFFFFF'
            }
        )

  
    }

}