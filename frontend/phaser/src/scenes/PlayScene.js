import * as Phaser from 'phaser';
import levelList from '../../static/allJourneysData.json';

export default class PlayScene extends Phaser.Scene {
    luxmeterName;
    bottleName;
    elementBlur;
    elementBoxTxt;
    elementTxt;
    mGlass1;
    objectListNumber;
    objectList;
    visibilityBool;
    levelData;
    urlDatabase;

    constructor() {
        super({ key: 'PlayScene'});
    }

    init(data)
    {
        this.urlDatabase = '',
        this.levelData = data;
        this.getAllInfos(this.levelData);
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
        this.visibilityBool = true;
        this.showAllElements(false);
        this.glassBottle.setVisible(false);
        this.glassLuxmetre.setVisible(false);
        this.textScene.scene.start();
        this.desactiveScene();
    }

    displayText2() {
        this.textScene.data.set('reactiveScene', this.reactiveScene.bind(this));
        //this.textScene.data.set('displayText', this.displayTextScene.bind(this));
        this.showAllElements(false);
        this.glassBottle.setVisible(false);
        this.glassLuxmetre.setVisible(false);
        this.textScene.scene.start();
        this.desactiveScene();
    }

    showElement(number, bool) {
        if (number == 1) {
            this.elementTxt.setVisible(bool);
            this.elementBlur.setVisible(bool);
            this.elementBoxTxt.setVisible(bool);
        } else {
            this.elementTxt2.setVisible(bool);
            this.elementBlur2.setVisible(bool);
            this.elementBoxTxt2.setVisible(bool);
        }
    }

    showAllElements(bool) {
        this.showElement(1, bool);
        this.showElement(2, bool);
    }

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
        this.glassLuxmetre.setVisible(true);
        this.glassBottle.setVisible(true);
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

        this.visibilityBool = false;
        const glassImg = document.createElement('img');
        glassImg.src = '/static/mglass.png';
        glassImg.classList = ['glassClass'];
        glassImg.addEventListener('mouseover', ()=> {this.showInfos(true); this.showElement(1, true)});
        glassImg.addEventListener('mouseout', ()=> {this.showInfos(false); this.showElement(1, false)});
        glassImg.addEventListener('click', ()=> {this.displayText();});


        const glassImg2 = document.createElement('img');
        glassImg2.src = '/static/mglass.png';
        glassImg2.classList = ['glassClass'];
        glassImg2.addEventListener('mouseover', ()=> {this.showInfos2(2, true); this.showElement(2, true)});
        glassImg2.addEventListener('mouseout', ()=> {this.showInfos2(2, false);this.showElement(2, false)});
        glassImg2.addEventListener('click', ()=> {this.displayText2()});

        const luxmeterName2 = document.createElement('div');

        this.glassLuxmetre = this.add.dom(game.config.width / 2, game.config.height / 2, glassImg);
        this.glassBottle = this.add.dom(game.config.width / 4, game.config.height / 1.3, glassImg2);
        // this.glassLuxmetre = this.add.image(game.config.width / 2, game.config.height / 2, 'mGlass');
        // this.luxmeterName2 = this.add.dom(game.config.width / 2 - 100, game.config.height / 2 - 190, luxmeterName2, { fontFamily: 'Arial', fontSize: 32, color: 'white' });


        const darkColor = new Phaser.Display.Color(0, 0, 0);
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

        this.elementBlur = this.add
            .dom(
                game.config.width / 2 + 2,
                game.config.height / 2 - 68,
                'div',
                styleBlur,
                ''
            );

        this.elementBoxTxt = this.add
            .dom(
                game.config.width / 2,
                game.config.height / 2 - 70,
                'div1',
                styleTxt,
                ''
            );
        this.elementTxt = this.add
            .dom(
                game.config.width / 2,
                game.config.height / 2 - 70,
                'div1',
                styleTxt,
                this.cache.text.get('luxmeterTitle')
            );

        // bouteille d'eau
        this.elementBlur2 = this.add
            .dom(
                game.config.width / 4 + 2,
                game.config.height / 1.3 - 68,
                'div',
                styleBlur,
                ''
            );
        this.elementBoxTxt2 = this.add
            .dom(
                game.config.width / 4,
                game.config.height / 1.3 - 70,
                'div1',
                styleTxt,
                ''
            );
        this.elementTxt2 = this.add
            .dom(
                game.config.width / 4,
                game.config.height / 1.3 - 70,
                'div1',
                styleTxt,
                this.cache.text.get('bottleTitle')
            );

        this.bottle = this.add
            .image(game.config.width / 4, game.config.height / 1.3, 'bottle')
            .setInteractive({ useHandCursor: true }).setVisible(false);

        this.showAllElements(false);
    }

    update() {
    }

    showInfos(bool) {
        this.visibilityBool = bool;
        this.elementTxt.hidden = bool;
        this.elementBlur.hidden = bool;
    }

    showInfos2(bool) {
        this.visibilityBool = bool;
        this.elementTxt2.visibility = bool;
        this.elementBlur2.visibility = bool;
    }

    getAllInfos(data) {
        console.log(data);
        // TODO: Get level name
        this.levelData = levelList.levelList[0];

        // TODO: Get all infos of that level
        console.log(this.levelData);
    }


    getAllInfosWithFetch(levelId) {
        console.log(levelId);
        // TODO: Get level name
        /*axios.get(urlDatabase)
            .then(response => {
                // Traitement des données reçues
                this.levelData = response.data;
                // this.oneJourneyInfosSimple = response.data[1];
            })
            .catch(error => {
                // Traitement des erreurs
                console.log(error);
            });*/
        this.levelData = levelList.levelList[0];

        // TODO: Get all infos of that level
        // console.log(this.levelData);
    }

    createAllObject() {
        this.levelData;
    }
}
