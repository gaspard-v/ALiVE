import * as Phaser from "phaser";
import {Button} from "../gameObjects/mainMenu/Button";
import Days from "../scenes/Days";
import Maps from "./Maps";
import axios from "axios";

class DaysMenu extends Phaser.Scene{
    days;
    constructor(handle){
        super(handle)
    }
    preload(){
        this.load.image('button','/static/assets/images/menu/dayOneButton.png')
        this.load.image('background','/static/assets/images/menu/mainMenuBackground.jpg');
    }
    create(){
        const {width,height} = this.scale;
        const xbutton = 605;
        const ybutton1 = height*0.35;
        this.add.sprite(width/2,height/2,'background');


        this.add.image(600,height/2,'blackBanner');
        this.add.image(600,200,'levelLabel');

        this.days = "";

        axios.get('http://localhost:8080/api/day', {
            params: {
                full: true
            }
        })
            .then((response) =>
            {
                const dayKey = this.getDayKey(response.data)
                const day1 = new Button(xbutton,ybutton1,'button',this,()=>{this.chargeDay(dayKey,response.data)},1.5)
            })
            .catch((e) => console.log(e));
            
        var axiosDay = "";

        


    }
    getDayKey(response){
        return response["message"][0]["uuid"]
    }


    chargeDay(key,data){
        if (!this.scene.isActive(key)){
            const day = new Days(key,data);
            this.scene.add(key,day);
        } 
        // Start the designated scene and stop the rendering of the present one
        this.scene.start(key);
        // Be warned : Remove deletes the scene 
    }
}

export class MainMenu extends Phaser.Scene{
    constructor(){
        super({ĸey:"MainMenu",active:true});
    }
    preload(){
        this.load.image('searchIcon','/static/assets/images/utils/searchIcon.png');
        this.load.image('background','/static/assets/images/menu/menuBackground.png');
        this.load.image('playbutton', '/static/assets/images/menu/playButton.png');
        this.load.image('dayOneButton','/static/assets/images/menu/dayOneButton.png')
        this.load.image('transitionIcon','/static/assets/images/utils/transitionIcon.png')
        this.load.image('blackBanner','/static/assets/images/utils/blackBanner.png')
        this.load.image('menuLabel','/static/assets/images/utils/menuLabel.png')
        this.load.image('levelLabel','/static/assets/images/menu/levelLabel.png')
        this.load.image('itemFrame','/static/assets/images/utils/itemRectangle.png');
        this.load.image('itemGroup','/static/assets/images/utils/itemGroup.png');

    }

    create(){

        const {width,height} = this.scale;

        this.add.sprite(width/2,height/2,'blackBanner')
        // Prepare the position of the buttons
        const xbutton = 605;
        const ybutton1 = height*0.35;
        // Create the background
        this.add.image(width/2,height/2,'background');
        this.add.image(600,height/2,'blackBanner');
        this.add.image(600,200,'menuLabel');
        // Create buttons based on the prior position and loaded images
        const playButton = new Button(xbutton,ybutton1,'playbutton',this,() => {this.chargeScene(DaysMenu,"DaysMenu")},1.5)

    }

    chargeScene(sceneObject,key){
        if (this.scene.isActive(key) === null){
            const day = new sceneObject(key);
            this.scene.add(key,day);
        } 
        // Start the designated scene and stop the rendering of the present one
        this.scene.start(key);


        // Be warned : Remove deletes the scene 
    }
}
