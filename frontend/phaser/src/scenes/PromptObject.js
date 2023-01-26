import * as Phaser from 'phaser';

export default class PromptObject extends Phaser.Scene{
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor(handle,parentScene,objectData){
        super(handle)
        this.parentSceneKey = parentScene;
        this.titleData = objectData.name;
        this.texteData = objectData.description;
        this.imageData = objectData.image;
        console.log(this.imageData);
    }
    preload(){
        this.load.text('luxmetreText', '../../static/luxmetreText.txt');
        this.load.text('bottleText', '../../static/bottleText.txt');
        this.load.image('closeIcon', '../../static/assets/images/utils/close2.png');
        this.load.image('promptBackground',this.imageData);
    }

    stopScene() {
        this.scene.bringToTop(this.parentSceneKey)
    }

    createRectangle(
        x,
        y,
        width,
        height,
        radius,
        color,
        depth = undefined
    ){

        this.add.sprite(x,y,'promptBackground')
            .setAngle(90)
            .setScale(10)
            .setAlpha(0.8);


        const closeButton = this.add
            .image(0, 0, 'closeIcon')
            .setInteractive({ useHandCursor: true });
        closeButton.setX(0);
        closeButton.setY(0);
        closeButton.on('pointerdown', () => this.stopScene());

    }


    create(){

        const {width,height} = this.scale;

        this.add.sprite(width/2,height/2,'promptBackground')
            .setAngle(90)
            .setScale(6)
            .setAlpha(0.8);

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