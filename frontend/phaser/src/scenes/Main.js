import * as Phaser from "phaser";
import {Button} from "../gameObjects/mainMenu/Button";
import Days from "../scenes/Days";
import Maps from "./Maps";
import axios from "axios";

class DaysMenu extends Phaser.Scene{
    constructor(handle){
        super(handle)
    }
    preload(){
    }
    create(){
        const {width,height} = this.scale;
        const xbutton = width*0.34;
        const ybutton1 = height*0.35;
        this.add.sprite(width/2,height/2,'background');

        // const chargeDay = (res) => {
        //     axiosDay = res.message;
        //
        //     const dayKey = axiosDay[0].uuid;
        //
        //     if (!this.scene.isActive(dayKey)){
        //         const day = new Days(dayKey,axiosDay);
        //         this.scene.add(dayKey,day,true);
        //     }
        //     this.scene.bringToTop(dayKey);
        // }

        axios.get('http://localhost:8080/api/day', {
            params: {
                full: true
            }
        })
            .then(function (response)
            {
                // initDay(response.data);
                console.log(response.data);
            })
            .catch((e) => console.log(e));

        var axiosDay = "";

        const day1 = new Button(xbutton,ybutton1,'button',this,()=>{this.chargeDay('C5E769E5A14611ED9D200242AC140003')},1.5)

    }
    chargeScene(sceneObject,key){
        if (!this.scene.isActive(key)){
            const day = new sceneObject(key);
            this.scene.add(key,day,true);
        }
        this.scene.start(key)
        this.scene.remove(this.scene.key)

    }
}

export class MainMenu extends Phaser.Scene{
    constructor(){
        super("MainMenu");
    }
    preload(){
        this.load.image('button','/static/assets/images/menu/Bouton.png')
        this.load.image('roomBackground','/static/assets/images/rooms/ancienneClasse.jpeg');
        this.load.image('searchIcon','/static/assets/images/utils/searchIcon.png');
        this.load.image('background','/static/assets/images/menu/mainMenuBackground.jpg');
        this.load.image('playbutton', '/static/assets/images/menu/playButton.png');
        this.load.image('settingButton','/static/assets/images/menu/settingsButton.png');
        this.load.image('gray','/static/assets/images/menu/grayBackground.jpg');
        this.load.image('transitionIcon','/static/assets/images/utils/transitionIcon.png')
        this.load.image('green','/static/assets/images/utils/green.jpg')
        this.load.image('itemFrame','/static/assets/images/utils/itemRectangle.png');
        this.load.image('itemGroup','/static/assets/images/utils/itemGroup.png');

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
        // Start the designated scene and stop the rendering of the present one
        this.scene.start(key)
        // Be warned : Remove deletes the scene 
        
    }

}
