import ItemSelect from "./ItemSelect";

export class ItemContainer{
    objectData;
    title;
    container
    constructor(x,y, {title, data},scene,mask,xRectTopLeft,yRectTopLeft){
        this.title = title;
        this.objectData = data;
        this.container = scene.add.container(x,y).setName('dayInventoryContainer')

        
        scene.add.text(
            xRectTopLeft + 80 - this.title.toString().length/2,
            yRectTopLeft - 50,
            this.title,
            {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: 32,
                color: '#ffffff'
            }
        );
        
        let xObject = -100;
        let yObject = -250;

        this.objectData.forEach((object,index)=>{
            object.index= index;
            const frame = scene.add.sprite(xObject,yObject,'itemFrame');
            frame.setScale(1.2);
            const padding = frame.height/4;
    
    
            if(index%2 === 0 && index!==0){
                yObject = yObject + frame.height + padding;
            }
    
            if (object.object) {
                object.xObject = xObject;
                object.yObject = yObject;
                const imageObject = scene.add.sprite(xObject,yObject,"image_"+object.object);
                imageObject.setPosition(xObject,yObject).setName("image_"+object.object);
                imageObject.setScale(frame.height/imageObject?.height);
                imageObject.setInteractive();
                imageObject.on('pointerdown', function () {
                    scene.events.emit("addObject", {title, info: object});
                });
                this.container.add(imageObject);
                frame.setName('frame_'+object.index)
            }            
    
            frame.setPosition(xObject,yObject);
            this.container.add(frame);
            xObject = xObject*(-1);
    
            // Le masque permet de couper les objets
    
        });

        this.container.setMask(mask);
        
    }

    setObjectData(objectData) {
        this.objectData = objectData;
    }
}