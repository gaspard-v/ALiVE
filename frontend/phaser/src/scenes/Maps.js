
import {SearchIcon } from "../gameObjects/mainMenu/Button";
import PromptRoom from "./PromptRoom";

export default class Maps extends Phaser.Scene{
    constructor(handle,mapData){
        super(handle);
        this.map = mapData;
    }
    preload(){
        this.load.json('placeData','/static/assets/json/placeData.json');

        this.load.image('mapBackground',"/static/assets/images/map/mapBackground.png");
        this.load.image('mapLabel',"/static/assets/images/map/mapLabel.png");
        this.load.image('mapShape',"/static/assets/images/map/mapShape.png");
        this.load.image('mapRules',"/static/assets/images/map/mapRules.png");
        this.load.image('mapButton',"/static/assets/images/map/mapButton.png");
        this.load.image('visitButton',"/static/assets/images/map/visitButton.png");
        this.load.image('quitButton',"/static/assets/images/map/quitButton.png");
        this.load.image('backButton',"/static/assets/images/map/backButton.png");
        this.load.image('promptBackground',"/static/assets/images/menu/promptBackground.png");
        this.load.image('closeIconWhite','/static/assets/images/menu/closeIconWhite.png')
    }
    create(){
        const {width,height} = this.scale;
        this.add.image(width / 2, height / 2, 'mapBackground');
        this.add.image(150, 100, 'mapLabel');
        this.add.image(width / 2, height / 2, 'mapShape');
        this.add.image(width / 2, height - 150, 'mapRules');

        const accessiblePlaces = this.map.map((place)=>{

        const button = new SearchIcon(
            place.name,
            place.x,
            place.y,
                'mapButton',
                this,
                () => {this.displayRoomInfo(place)},
                1
            )
        })
        
    }   
    
    displayRoomInfo(place){
        const key = place.uuid+"Prompt";

        if(this.scene.isActive(key) === null){
            const display = new PromptRoom(key,this,place);
            this.scene.add(key,display,true);
        }
        this.scene.launch(key);
        this.scene.setActive(false);
    }
}