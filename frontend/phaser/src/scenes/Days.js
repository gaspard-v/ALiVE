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
        const data = this.cache.json.get('mapData');

        if (data.status !== "success"){
            console.log(data)
        }

        const mapKey = data.content[0].uuid;
        const places = data.content[0].places;

        if (!this.scene.isActive(mapKey)){
            const map = new Maps(mapKey,places);
            this.scene.add(mapKey,map,true);
        } 
        this.scene.bringToTop(mapKey);
    }
}

class PromptObject extends Phaser.Scene{
    constructor(handle){
        super(handle)
    }
    preload(){

    }
    create(){
        
    }
}

//class SearchIcons extends Phaser.Scene{
    //constructor(){

    //}
    //preload(){

    //}
    //create(){
        
    //}

//}