import Phaser from 'phaser';
import PlayScene from './PlayScene';

export default class MainMenuScene extends Phaser.Scene {
<<<<<<< Updated upstream
    mask;

=======
    allData;
    oneJourneyInfosSimple;
    mask;


>>>>>>> Stashed changes
    constructor() {
        super({ key: 'main-menu', active: true });
    }

    init() {
        this.allData = {};
        this.oneJourneyInfosSimple = {};
        this.cursors = this.input.keyboard.createCursorKeys();
        this.getAllJourneyInfos();
    }

    preload() {
        this.load.image('glass-panel', '/static/assets/glassPanel.png');
        this.load.image('cursor-hand', '/static/assets/cursor_hand.png');
        this.load.image('background', '/static/mainMenu.jpg');
    }

    create() {
        const { width, height } = this.scale;

        // background image
        this.add
            .image(width * 0.5, height * 0.5, 'background')
            .setDisplaySize(width, height);

        // PlayScene button
        const playSceneButton = document.createElement('button');
        playSceneButton.addEventListener('click', () => {this.changeScene('PlayScene')});
        playSceneButton.appendChild(document.createTextNode('Go to PlayScene'));
        document.body.appendChild(playSceneButton);

        // Play button
        const playButton = this.add
            .image(width * 0.5, height * 0.6, 'glass-panel')
            .setDisplaySize(150, 50);

        this.add.text(playButton.x, playButton.y, 'Play').setOrigin(0.5);

        // Settings button
        const settingsButton = this.add
            .image(
                playButton.x,
                playButton.y + playButton.displayHeight + 10,
                'glass-panel'
            )
            .setDisplaySize(150, 50);

        this.add
            .text(settingsButton.x, settingsButton.y, 'Settings')
            .setOrigin(0.5);

        // Credits button
        const creditsButton = this.add
            .image(
                settingsButton.x,
                settingsButton.y + settingsButton.displayHeight + 10,
                'glass-panel'
            )
            .setDisplaySize(150, 50);

        this.add
            .text(creditsButton.x, creditsButton.y, 'Credits')
            .setOrigin(0.5);

        // set the mask
        // TODO: continue main view
        // const styleMask = {
        //  'background-color': 'rgba(255,255,255)',
        //  width: '220px',
        //  height: '50px',
        // };

        // this.mask = this.add.dom(
        //  400,
        //  300,
        //  'div',
        //  styleMask,
        //  ''
        // )
        // this.mask.visibility = true;
        // this.mask.setVisible(true);
    }

    selectButton(index) {
        // TODO
    }

    selectNextButton(change = 1) {
        // TODO
    }

    confirmSelection() {
        // TODO
    }

    update() {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const downJustPressed = Phaser.Input.Keyboard.JustDown(
            this.cursors.down
        );
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(
            this.cursors.space
        );

        if (upJustPressed) {
            this.selectNextButton(-1);
        } else if (downJustPressed) {
            this.selectNextButton(1);
        } else if (spaceJustPressed) {
            this.confirmSelection();
        }

        // this.mask.setVisible();
<<<<<<< Updated upstream
    }

    getAllJourneyInfos() {
        // TODO: GET LEVEL DATA HERE OR ALL LEVEL DATA
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // Traitement des données reçues
                console.log(response.data);
            })
            .catch(error => {
                // Traitement des erreurs
                console.log(error);
            });
    }

    changeScene(sceneToGo) {
        this.scene.setActive(false);
        if (sceneToGo == "PlayScene") {
            this.scene.start(sceneToGo);
        }
=======
>>>>>>> Stashed changes
    }

    getAllJourneyInfos() {
        // TODO: GET LEVEL DATA HERE OR ALL LEVEL DATA
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // Traitement des données reçues
                this.allData = response.data;
                this.oneJourneyInfosSimple = response.data[1];
            })
            .catch(error => {
                // Traitement des erreurs
                console.log(error);
            });
    }

    changeScene(sceneToGo) {
        this.scene.setActive(false);
        if (sceneToGo == "PlayScene") {
            this.scene.start(sceneToGo, {globalInformations: this.oneJourneyInfosSimple});
        }
    }
}