import * as Phaser from 'phaser';
import { ItemContainer } from '../objects/ItemsContainer';

export default class Reflection extends Phaser.Scene{
    constructor(handle){
        super(handle);
        this.inventory = [];
        this.itemsSelection = [];
    }
    preload(){
    }
   
    create(){
        const borderRadius = 20;
        const x = 480;
        const y = 540;
        this.getObjectData();

        // Create a sprite and add it to the scene
        const sprite = this.add.sprite(x, y, 'itemGroup');
        const xRectTopLeft = x - sprite.width/2;
        const yRectTopLeft = y - sprite.height/2;

        // Create a graphics object for the mask
        const maskGraphics = this.make.graphics()
                    .fillStyle(0xffffff, 1)
                    .fillRoundedRect(xRectTopLeft, yRectTopLeft, sprite.width, sprite.height, borderRadius);
        
        const mask = maskGraphics.createGeometryMask();
        
        // Set the mask on the sprite
        sprite.setMask(mask);

        const items = new ItemContainer(x,y,this.itemsSelection,this,mask,xRectTopLeft,yRectTopLeft);           
       
        
    }
  

    getObjectData(){

        // If you want to change the data, you get it here 
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