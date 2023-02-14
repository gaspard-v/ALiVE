import {SearchIcon } from "../gameObjects/mainMenu/Button";
import PromptRoom from "./PromptRoom";

export default class Maps extends Phaser.Scene{
    constructor(handle,mapData){
        super(handle);
        this.map = mapData;
    }
    preload(){
        this.load.json('placeData','/static/assets/json/placeData.json');
        this.load.image('testmap',"/static/assets/images/maps/mapTest1.png" );
        this.load.image('mapbutton','/static/assets/images/utils/reddot.png');
    }
    create(){
        // Load all interesting variables
        const {width,height} = this.scale;
        
        // Create sprite for the map  
        this.add.sprite(width/2,height/2,'testmap').setScale(1.3);
        
        // Parsing data and creating the map buttons
        
        const accessiblePlaces = this.map.map((place)=>{

        const button = new SearchIcon(
            place.name,
            place.x,
            place.y,
                'mapbutton',
                this,
                () => {this.displayRoomInfo(place)},
                0.080
            )

        })
        
    }   
    
    displayRoomInfo(place){
        const key = place.uuid+"Prompt";
        if(!this.scene.isActive(key)){
            const display = new PromptRoom(key,this,place);
            this.scene.add(key,display,true);
        }
        this.scene.bringToTop(key);
    }
}