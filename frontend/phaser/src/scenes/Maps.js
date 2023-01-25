import Places from "./Places";
import {SearchIcon } from "../gameObjects/mainMenu/Button";

export default class Maps extends Phaser.Scene{
    constructor(handle,mapData){
        super(handle);
        this.map = mapData;
    }
    preload(){
        this.load.json('placeData','/static/assets/json/placeData.json');
        this.load.image('testmap',"/static/assets/images/maps/mapTest1.png" );
        this.load.image('mapbutton','/static/assets/images/utils/blackdot.png');
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
                () => {this.chargePlace(place)},
                0.080
            )

        })
        
    }   
    chargePlace(placeData){
        const place = new Places(placeData.uuid, placeData.rooms);
        this.scene.add(placeData.key,place,true);
    }
}