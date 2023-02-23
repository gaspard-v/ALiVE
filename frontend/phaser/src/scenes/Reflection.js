import * as Phaser from 'phaser';
import { ItemContainer } from '../objects/ItemsContainer';

export default class Reflection extends Phaser.Scene{
    items;
    itemsInventory;

    constructor(handle){
        super(handle);
        this.inventory = [{}, {}, {}];
        this.itemsSelection = [];
    }
    preload(){
    }

    addToSelection(object) {
        this.removeToInventory(object);
    }

    removeToInventory(object) {

    }

    removeToSelection(object) {
        for (let i = 0; i < this.itemsSelection.length; i++) {
            if (this.itemsSelection[i].object === object.object) {
                this.itemsSelection.splice(i, 1);
                break;
            }
        }
    }

    update() {
        this.items.setObjectData(this.itemsSelection);
        this.itemsInventory.setObjectData(this.inventory);
    }

    create(){
        const borderRadius = 20;
        const x = 480;
        const y = 540;
        this.getObjectData();

        // Item list part
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

        this.items = new ItemContainer(x,y,["Objets découverts",this.itemsSelection],this,mask,xRectTopLeft,yRectTopLeft);

        // Inventory part
        // Create a sprite and it to the scene
        const spriteInventory = this.add.sprite(3*x, y, 'itemGroup');
        const xInventoryRectTopLeft = 3*x - spriteInventory.width/2;
        const yInventoryRectTopLeft = y - spriteInventory.height/2;

        // Create a graphics object for the mask
        const inventoryMaskGraphics = this.make.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(xInventoryRectTopLeft, yInventoryRectTopLeft, spriteInventory.width, spriteInventory.height, borderRadius);

        const inventoryMask = inventoryMaskGraphics.createGeometryMask();

        // Set the mask on the sprite
        spriteInventory.setMask(inventoryMask);

        this.itemsInventory = new ItemContainer(x+960, y, ["Mon sac à dos",this.inventory], this, inventoryMask, xInventoryRectTopLeft, yInventoryRectTopLeft);

        this.events.on('addObject',  (info) => {
            this.addToInventory(info); // ajout d'un objet dans l'inventaire (sac à dos)
            // comment dissocier le sens en fonction de l'endroit
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

    addToInventory(object) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i].object) {
                this.inventory[i] = object;
                break;
            }
        }
        this.removeToSelection(object);
    }
    
}