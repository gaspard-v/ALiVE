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
        console.log("image data val : ",this.imageData);
    }
    preload(){
        this.load.image('closeIcon', '../../static/assets/images/utils/close2.png');
        this.load.image('promptBackground','../../static/assets/images/utils/papyrus.jfif');
    }

    stopScene() {
        this.scene.bringToTop(this.parentSceneKey)
    }

    dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    }


    create(){

        const {width,height} = this.scale;

        // Convert base64Image to blob
        var imgBlob = this.dataURItoBlob(this.imageData);

        // Create a new image and set its source to the blob
        var img = new Image();
        img.src = window.URL.createObjectURL(imgBlob);

        console.log(img)

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

        this.imageEncodedTest = this.add.image(
            20,
            30,
            img
        );

        console.log(atob(this.imageData));

        this.texte = this.add.text(
            width / 4,
            height / 4,
            this.texteData,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 64,
            }
        )

        /*this.imageObject = this.add.image(
            width / 2,
            width / 2,
            atob(this.imageData)
        );*/
    }

}