import * as Phaser from "phaser";
import Maps from "./Maps";

export default class Days extends Phaser.Scene{
    constructor(handle){
        super(handle);
    }
    preload(){
        this.load.json('mapData','static/assets/json/mapData.json');
    }
    create(){
        const response = this.cache.json.get('mapData');

        if (response.status !== "success"){
            console.log(response)
        }

        // This will be changed once we get the day endpoint

        const mapKey = response.content[0].uuid;
        const placesData = response.content[0].places;

        if (!this.scene.isActive(mapKey)){
            const map = new Maps(mapKey,placesData);
            this.scene.add(mapKey,map,true);
        } 
        this.scene.bringToTop(mapKey);
    }
}


