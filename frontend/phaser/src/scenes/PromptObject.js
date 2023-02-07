import * as Phaser from 'phaser';
import {isReflectionDelayOver} from "./ReflectionButton.js"


export default class PromptObject extends Phaser.Scene{
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor(handle,parentScene,objectData){
        super(handle)
        this.parentSceneKey = parentScene;
        this.titleData = objectData.name;
        this.texteData = objectData.description;
        this.base64 = objectData.image;
    }
    preload(){
        const dataURI = this.base64;
        const imageTest = new Image();
        imageTest.src = dataURI
        
        this.textures.addBase64('image'+this.scene.key,dataURI);
        this.load.image('closeIcon', '../../static/assets/images/utils/close2.png');
        this.load.image('promptBackground','../../static/assets/images/utils/papyrus.jfif');
    }
    
    stopScene() {
        this.scene.bringToTop(this.parentSceneKey)
        if (isReflectionDelayOver) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton')
        }
    }
    
    create(){

        const {width,height} = this.scale;

        this.add.sprite(width/2,height/2,'promptBackground')
            .setAngle(90)
            .setScale(6)
            .setAlpha(0.8);

        this.add.sprite(width/2,height/2,'image'+this.scene.key)
            .setScale(0.7);

        const closeButton = this.add
            .image(width - width/4, 100, 'closeIcon')
            .setInteractive({ useHandCursor: true });

            closeButton.on('pointerdown', () => this.stopScene());

        this.titleText = this.add.text(
            width / 3,
            40,
            this.titleData,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 86,
            }
        )

        this.texte = this.add.text(
            width / 4,
            height / 4,
            this.texteData,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 64,
            }
        )

  
    }

}