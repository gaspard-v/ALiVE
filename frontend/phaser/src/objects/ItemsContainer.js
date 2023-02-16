import ItemSelect from "./ItemSelect";

export class ItemContainer{
    constructor(x,y,objectData,scene){

        const borderRadius = 20;
       
        // Create a sprite and add it to the scene
        const sprite = scene.add.sprite(0, 0, 'itemGroup');
        const xRect = x - sprite.width/2;
        const yRect = y - sprite.height/2;

        // Create a graphics object for the mask
        const maskGraphics = scene.make.graphics();

        // Set the fill style and draw a rounded rectangle on the graphics object
        maskGraphics.fillStyle(0xffffff, 1);
        maskGraphics.fillRoundedRect(xRect, yRect, sprite.width, sprite.height, borderRadius);

        // Create a mask from the graphics object
        const mask = maskGraphics.createGeometryMask();

        // Set the mask on the sprite
        sprite.setMask(mask);
        const frame = scene.add.sprite(0,0,'itemFrame');

        const container = scene.add.container(x,y,[sprite])
        objectData.map((object)=>{
            const imageObject = scene.add.sprite(0,0,"image_"+object.object)
            container.add(imageObject)
            
        })
        
    }
}