import * as Phaser from 'phaser';

export default class PromptObject extends Phaser.Scene{
    x = Phaser.Math.Between(400, 600);
    y = Phaser.Math.Between(64, 128);

    constructor(handle,parentScene,objectData){
        super(handle)
        this.parentSceneKey = parentScene;
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
        console.log(this);
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

        //const graphics = this.add.graphics();
        //graphics.generateTexture('promptBackground',width,height);
        //const rectangle = graphics.fillRoundedRect(0, 0, width, height, radius);
        //rectangle.setX(x);
        //rectangle.setY(y);



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

        // var texture = this.textures.createCanvas('canvasTexture',800, 600);
        // var papyrusExample =  this.textures.get('promptBackground').getSourceImage();
        // texture.draw(300,100,papyrusExample);
        // this.add.image(500,)
    }


    create(){

        const {width,height} = this.scale;
        // this.add.sprite(width/2,height/2,'green')
        //     .setAlpha(0.5)
        //     .setScale(5)
        //     .setAngle(90)


        this.add.sprite(width/2,height/2,'promptBackground')
            .setAngle(90)
            .setScale(6)
            .setAlpha(0.8);


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
            }
        )
    }

}