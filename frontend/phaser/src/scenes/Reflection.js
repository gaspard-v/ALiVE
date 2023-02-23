import * as Phaser from 'phaser';
import { ItemContainer } from '../objects/ItemsContainer';

export default class Reflection extends Phaser.Scene{
    constructor(handle){
        super(handle);
        this.inventory = [];
        this.itemsSelection = [];
        this.scroller ;
    }
    preload(){
    }
   
    create(){
        const slidingDeceleration = 5000;
        const backDeceleration = 2000;
        var bottomBound = 0;
        const borderRadius = 20;
        const x = 480;
        const y = 540;
        this.getObjectData();
        
        // Create a sprite and add it to the scene
        const background = this.add.sprite(x, y, 'itemGroup');
        const xRectTopLeft = x - background.width/2;
        var yRectTopLeft = y - background.height/2;
        var topBound = yRectTopLeft;

        // Create a graphics object for the mask
        const maskGraphics = this.make.graphics()
                    .fillStyle(0xffffff, 1)
                    .fillRoundedRect(xRectTopLeft, yRectTopLeft, background.width, background.height, borderRadius);
        
        const mask = maskGraphics.createGeometryMask();
        
        // Set the mask on the sprite
        background.setMask(mask);

        // Creates the content from the item selection
        new ItemContainer(x,y,this.itemsSelection,this,mask,xRectTopLeft,yRectTopLeft);           
        
        // Get the created container
        const container = this.children.getByName('dayInventoryContainer');
        
        
        
        if (container.height > background.height){
            bottomBound = y - container.height + background.height;
        } 
        else{
            bottomBound = y;
        }

        // Scroller is a plugin using the background sprite as a 
    
        this.scroller = this.plugins.get('rexScroller').add(background, {
            bounds: [
                bottomBound,
                topBound
            ],
            value: bottomBound,
            slidingDeceleration: slidingDeceleration,
            backDeceleration: backDeceleration,
            valuechangeCallback: function (value) {
                container.y = value;
            }

        });

        
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