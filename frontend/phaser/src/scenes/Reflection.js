import * as Phaser from 'phaser';
import { ItemContainer } from '../objects/ItemsContainer';

const DISCOVERED_OBJECTS = "Objets découverts";
const BACKPACK = "Mon sac à dos";


export default class Reflection extends Phaser.Scene{
    items;
    itemsInventory;
    container;
    
    
    constructor(handle){
        super(handle);
        this.inventory = [{}, {}, {}];
        this.itemsSelection = [];
        this.scroller;
    }
   // preload(){
   // }
   // 
   // stateValues(place) {
   //     console.log(place);
   //     this.stateDiscovered();
   //     this.stateInventory();
   // }
   // 
   // stateDiscovered() {
   //     console.log('discovered list : ', this.itemsSelection);
   // }

   // stateInventory() {
   //     console.log('discovered list : ', this.inventory);
   // }
    
   
   create(){
        this.getObjectData();
        const x = 480;
        const y = 540;

        const spriteInventory = this.add.sprite(3*x, y, 'itemGroup');
        const xInventoryRectTopLeft = 3*x - spriteInventory.width/2;
        const yInventoryRectTopLeft = y - spriteInventory.height/2;
        
        const slidingDeceleration = 5000;
        const backDeceleration = 2000;
        var bottomBound = 0;
        const borderRadius = 20;


        // Create a sprite and add it to the scene
        const inventoryBackground = this.add.sprite(x, y, 'itemGroup');
        const xRectTopLeft = x - inventoryBackground.width/2;
        var yRectTopLeft = y - inventoryBackground.height/2;
        var topBound = yRectTopLeft;
        
        // Create a graphics object for the mask
        const maskGraphics = this.make.graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(xRectTopLeft, yRectTopLeft, inventoryBackground.width, inventoryBackground.height, borderRadius);
        
        const mask = maskGraphics.createGeometryMask();
        
        // Set the mask on the sprite
        const inventoryMaskGraphics = this.make.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(xInventoryRectTopLeft, yInventoryRectTopLeft, spriteInventory.width, spriteInventory.height, borderRadius);
        const inventoryMask = inventoryMaskGraphics.createGeometryMask();
        inventoryBackground.setMask(mask);

        // Creates the content from the item selection
        this.items = new ItemContainer(x,y,{
            title: DISCOVERED_OBJECTS,
            data: this.itemsSelection
        },this,mask,xRectTopLeft,yRectTopLeft);
        
        // Get the created container
        const container = this.children.getByName('dayInventoryContainer');
        
        
        
        if (container.height > inventoryBackground.height){
            bottomBound = y - container.height + inventoryBackground.height;
        } 
        else{
            bottomBound = y;
        }

        // Scroller is a plugin using the inventoryBackground sprite as a 
        
    
        this.scroller = this.plugins.get('rexScroller').add(inventoryBackground, {
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


        /// Inventory part
        // Create a sprite and it to the scene

        // Create a graphics object for the mask

        // Set the mask on the sprite
        spriteInventory.setMask(inventoryMask);

        const objectData = {
            title: BACKPACK,
            data: this.inventory
        }

        this.itemsInventory = new ItemContainer(x+960, y, objectData, this, inventoryMask, xInventoryRectTopLeft, yInventoryRectTopLeft);
        

        this.events.on('addObject',  ({title, info}) => {
            if (title === DISCOVERED_OBJECTS) {
                this.addToInventory(info);
                this.removeFromSelection(info);
            } else {
                this.addToSelection(info); // retirer un objet de la liste du sac à dos
            }
        });

        

    }
    addToInventory(object) {
        //this.stateValues('add to inventory : ');
        for (let i = 0; i < this.inventory.length; i++){
            if(!this.inventory[i].object){
                this.inventory[i] = object;
                this.addToView(this.itemsInventory,object);
                this.delFromView(this.items,object)
                return
            }
        }
        this.removeFromSelection(object);
    }
    
    addToSelection(object) {
        this.itemsSelection.push(object);
        this.removeFromInventory(object);
        this.addToView(this.items,object);
        this.delFromView(this.itemsInventory,object);
        // this.stateValues('add to selection : ');
    }
 
    removeFromInventory(object) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].object === object.object) {
                this.inventory[i] = {};
                break;
            }
        }
    }
 
    removeFromSelection(object) {
        for (let i = 0; i < this.itemsSelection.length; i++) {
            if (this.itemsSelection[i].object === object.object) {
                this.itemsSelection.splice(i, 1);
                this.removeFromSelection(object)
                break;
            }
        }
    }
 
    addToView(items,object){                
        // ajout d'un objet dans l'inventaire (sac à dos)
        const sprite = this.add.sprite(object.xObject,object.yObject,"image_"+object.object);
        sprite.setName("image_"+object.object)
                .setScale(120/sprite?.height)
        const title = items.title;
        sprite.setInteractive()
                .on('pointerdown', function () {
                    this.scene.events.emit("addObject", {title, info: object});
                });
        items.container.add(sprite)
    }
 
    delFromView(items,object){
        const sprite = items.container.getByName("image_"+object.object)
        items.container.remove(sprite)        
    }
 
    updateInventoryView(){     
    }
    
    updateDayItemsView(){    
    }
    
    update = () =>{    
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
                        "image":object.image,
                        "xObject":null,
                        "yObject":null
                    })
                })                          
            })
        })
    }

    
}