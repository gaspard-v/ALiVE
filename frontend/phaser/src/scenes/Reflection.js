import * as Phaser from 'phaser';
import { ItemContainer } from '../objects/ItemsContainer';
import ItemSelect from '../objects/ItemSelect';

export default class Reflection extends Phaser.Scene{
    constructor(handle){
        super(handle);
        this.inventory = [];
        this.itemsSelection = [];
    }
    create(){
        this.getObjectData();
    
        const items = new ItemContainer(480,540,this.itemsSelection,this);
        
        
        
    }

    getObjectData(){
        const mapData = this.cache.json.get('mapData');
        const placeData = mapData.content[0].places;
        
        placeData.map((place)=>{
            place.rooms.map((room)=>{
                room.objects.map((object)=>{
                    this.itemsSelection.push({
                        "object":object.uuid,
                        "image":object.image
                    })
                })                          
            })
    
        })
    }
}