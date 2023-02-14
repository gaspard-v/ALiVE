import * as Phaser from "phaser";
import {Button} from "../gameObjects/mainMenu/Button";
import Days from "../scenes/Days";

class DaysMenu extends Phaser.Scene{
    constructor(handle){
        super(handle)
    }
    preload(){
        this.load.image('button','/static/assets/images/menu/Bouton.png')
    }
    create(){
        const {width,height} = this.scale;
        const xbutton = width*0.34;
        const ybutton1 = height*0.35;
        this.add.sprite(width/2,height/2,'background');
        const day1 = new Button(xbutton,ybutton1,'button',this,()=>{this.chargeScene(Days,'DayOne')},1.5)
        
    }
    chargeScene(sceneObject,key){
        if (!this.scene.isActive(key)){
            const day = new sceneObject(key);
            this.scene.add(key,day,true);
        }
        this.scene.bringToTop(key)
        this.scene.setActive(false)

    }
}

export class MainMenu extends Phaser.Scene{
    constructor(){
        super("MainMenu");
    }
    preload(){
        this.load.image('roomBackground','/static/assets/images/rooms/ancienneClasse.jpeg');
        this.load.image('searchIcon','/static/assets/images/utils/searchIcon.png');
        this.load.image('background','/static/assets/images/menu/mainMenuBackground.jpg');
        this.load.image('playbutton', '/static/assets/images/menu/playButton.png');
        this.load.image('settingButton','/static/assets/images/menu/settingsButton.png');
        this.load.image('gray','/static/assets/images/menu/grayBackground.jpg');
        this.load.image('transitionIcon','/static/assets/images/utils/transitionIcon.png')
        this.load.image('green','/static/assets/images/utils/green.jpg')

    }
    create(){

        const {width,height} = this.scale;

        // Prepare the position of the buttons
        const xbutton = width*0.34;
        const ybutton1 = height*0.35;
        const ybutton2 = height*0.45;
        // Create the background
        this.add.image(width/2,height/2,'background');

        // Create buttons based on the prior position and loaded images
        const playButton = new Button(xbutton,ybutton1,'playbutton',this,() => {this.chargeScene(DaysMenu,"DaysMenu")},1.5)
        const settingButton = new Button(xbutton,ybutton2,'settingButton',this,()=> console.log("game settigns"),1.5)
    }

    chargeScene(sceneObject,key){
        if (this.scene.isActive(key) === null){
            const day = new sceneObject(key);
            this.scene.add(key,day,true);
        }
        this.scene.bringToTop(key)
        this.scene.setActive(false)
    }

}
