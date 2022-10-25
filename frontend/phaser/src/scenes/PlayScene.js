import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    luxmeterName;
    bottleName;
    elementBlur;
    elementBoxTxt;
    elementTxt;
    mGlass1;
    constructor() {
        super({ key: 'PlayScene', active: true });
    }

    preload() {
        this.load.image('luxmetre', '/static/luxmetrePro.png');
        this.load.image('mGlass', '/static/mglass.png');
        this.load.image('exterior1', '/static/exterior1.jpg');
        this.load.image('bottle', '/static/bottle.png');
        this.load.text('luxmeterTitle', '/static/luxmeterTitle.txt');
        this.load.text('bottleTitle', '/static/bottleTitle.txt');
    }

    displayText() {
        this.textScene.data.set('reactiveScene', this.reactiveScene.bind(this));
        //this.textScene.data.set('displayText', this.displayTextScene.bind(this));
        this.elementTxt.setVisible(false);
        this.elementBlur.setVisible(false);
        this.textScene.scene.start();
        this.desactiveScene();
    }

    displayText2() {
        this.textScene.data.set('reactiveScene', this.reactiveScene.bind(this));
        //this.textScene.data.set('displayText', this.displayTextScene.bind(this));
        this.elementTxt2.setVisible(false);
        this.elementBlur2.setVisible(false);
        this.textScene.scene.start();
        this.desactiveScene();
    }

    displayTextScene() {}

    desactiveScene() {
        this.scene.setActive(false);
        this.scene.sendToBack();
        this.blur.active = true;
        this.darkRectangle.setVisible(true);
    }

    reactiveScene() {
        this.scene.setActive(true);
        this.scene.bringToTop();
        this.blur.active = false;
        this.darkRectangle.setVisible(false);
    }

    create() {
        this.scene.bringToTop();
        this.textScene = this.scene.get('TextScene');
        this.textScene.scene.stop();
        this.blur = this.plugins
            .get('rexKawaseBlurPipeline')
            .add(this.cameras.main, {
                intensity: 1,
            });
        this.blur.active = false;
        this.exterior1 = this.add.image(
            game.config.width / 2,
            game.config.height / 2,
            'exterior1'
        );
        this.mGlass = this.add
            .image(game.config.width / 2, game.config.height / 2, 'mGlass')
            .setInteractive({ useHandCursor: true });
        const glassImg = document.createElement('img');
        glassImg.src = '/static/mglass.png';
        glassImg.classList = ['glassClass'];
        this.glassTest = this.add.dom(400, 300, glassImg);

        this.mGlass2 = this.add
            .image(game.config.width / 4, game.config.height / 1.3, 'mGlass')
            .setInteractive({ useHandCursor: true });

        this.luxmeterName = this.add
            .text(
                game.config.width / 2 - 100,
                game.config.height / 2 - 190,
                this.cache.text.get('luxmeterTitle'),
                { fontFamily: 'Arial', fontSize: 32, color: 'white' }
            )
            .setVisible(false);

        this.bottleName = this.add
            .text(
                game.config.width / 2 - 100,
                game.config.height / 1.3 - 190,
                this.cache.text.get('bottleTitle'),
                { fontFamily: 'Arial', fontSize: 32, color: 'white' }
            )
            .setVisible(false);

        const darkColor = new Phaser.Display.Color(0, 0, 0);

        this.infosRectangle = this.add
            .rectangle(
                game.config.width / 2 - 40,
                game.config.height / 2 - 170,
                200,
                40,
                darkColor
            )
            .setAlpha(0.3)
            .setData(this.luxmeterName)
            .setVisible(false);

        this.infosRectangle2 = this.add
            .rectangle(
                game.config.width / 2 - 40,
                game.config.height / 1.3 - 170,
                200,
                40,
                darkColor
            )
            .setAlpha(0.3)
            .setData(this.luxmeterName)
            .setVisible(false);

        this.mGlass.on('pointerup', () => this.displayText());
        this.mGlass2.on('pointerup', () => this.displayText2());
        this.darkRectangle = this.add
            .rectangle(
                game.config.width / 2,
                game.config.height / 2,
                game.config.width,
                game.config.height,
                darkColor
            )
            .setAlpha(0.7)
            .setVisible(false);

        const styleBlur = {
            'background-color': 'rgba(100,100,100,0.8)',
            width: '220px',
            height: '50px',
            filter: 'blur(4px)',
        };

        const styleTxt = {
            width: '220px',
            height: '50px',
            font: '32px Arial',
            border: 'solid red',
            color: 'white',
            'text-align': 'center',
            'border-radius': '10px',
        };

        const styleBoxTxt = {
            width: '220px',
            height: '100px',
            font: '32px Arial',
            border: 'solid red',
            color: 'white',
            'text-align': 'center',
        };

        var styleOnMGlass = {
            filter: 'drop-shadow(0 0 0.75rem crimson)',
        };

        //this.mGlass1 = this.add.dom(this.cache.images.get('mGlass'));

        // luxmetre
        this.mGlassDom = this.add
            .dom(
                game.config.width / 2 + 2,
                game.config.height / 2 - 68,
                'div',
                styleBlur,
                ''
            )
            .setVisible(false);
        this.elementBlur = this.add
            .dom(
                game.config.width / 2 + 2,
                game.config.height / 2 - 68,
                'div',
                styleBlur,
                ''
            )
            .setVisible(false);
        this.elementBoxTxt = this.add
            .dom(
                game.config.width / 2,
                game.config.height / 2 - 70,
                'div1',
                styleTxt,
                ''
            )
            .setVisible(false);
        this.elementTxt = this.add
            .dom(
                game.config.width / 2,
                game.config.height / 2 - 70,
                'div1',
                styleTxt,
                this.cache.text.get('luxmeterTitle')
            )
            .setVisible(false);

        // bouteille d'eau
        this.elementBlur2 = this.add
            .dom(
                game.config.width / 4 + 2,
                game.config.height / 1.3 - 68,
                'div',
                styleBlur,
                ''
            )
            .setVisible(false);
        this.elementBoxTxt2 = this.add
            .dom(
                game.config.width / 4,
                game.config.height / 1.3 - 70,
                'div1',
                styleTxt,
                ''
            )
            .setVisible(false);
        this.elementTxt2 = this.add
            .dom(
                game.config.width / 4,
                game.config.height / 1.3 - 70,
                'div1',
                styleTxt,
                this.cache.text.get('bottleTitle')
            )
            .setVisible(false);

        this.bottle = this.add
            .image(game.config.width / 4, game.config.height / 1.3, 'bottle')
            .setInteractive({ useHandCursor: true })
            .setVisible(false);
    }

    update() {
        this.mGlass.on('pointerover', () => {
            this.showInfos(true);
        });
        this.mGlass.on('pointerout', () => {
            this.showInfos(false);
        });
        this.mGlass2.on('pointerover', () => {
            this.showInfos2(true);
        });
        this.mGlass2.on('pointerout', () => {
            this.showInfos2(false);
        });
    }

    showInfos(bool) {
        //this.infosRectangle.setVisible(bool);
        //this.luxmeterName.setVisible(bool);
        //this.mGlass.setVisible(!bool);
        this.elementTxt.setVisible(bool);
        this.elementBlur.setVisible(bool);
    }

    showInfos2(bool) {
        this.elementTxt2.setVisible(bool);
        this.elementBlur2.setVisible(bool);
    }
}
