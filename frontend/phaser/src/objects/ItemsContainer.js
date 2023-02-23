import ItemSelect from "./ItemSelect";

export class ItemContainer{
    objectData;
    title;
    constructor(x,y,objectData,scene,mask,xRectTopLeft,yRectTopLeft){
        this.objectData = objectData[1];
        this.title = objectData[0];
        const container = scene.add.container(x,y)
        
        let xObject = -100;
        let yObject = -250;

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

        this.objectData.forEach((object,index)=>{
            const frame = scene.add.sprite(xObject,yObject,'itemFrame');
            const padding = frame.height/4;

            if(index%2 === 0 && index!==0){
                yObject = yObject + frame.height + padding;
            }

            if (object.object) {
                const imageObject = scene.add.sprite(xObject,yObject,"image_"+object.object);
                imageObject.setPosition(xObject,yObject);
                imageObject.setScale(frame.width/imageObject?.width,frame.height/imageObject?.height);
                imageObject.setInteractive();
                imageObject.on('pointerdown', function () {
                    let info = object;
                    console.log(info);
                    this.scene.events.emit("addObject",info);
                });
                container.add(imageObject);
            }

            frame.setPosition(xObject,yObject);
            container.add(frame);
            xObject = xObject*(-1);

            // Le masque permet de couper les objets

        });
        container.setMask(mask);
            // console.log("inventory")
            // for (let i=0; i<maxObjectInventory; i++) {
            //     console.log(i);
            //     const frame = scene.add.sprite(xObject,yObject,'itemFrame');
            //     console.log(scene);
            //     const padding = frame.height/4;
            //     if(i%2 == 0){
            //         xObject = xObject*(-1);
            //     }
            //     else{
            //         yObject = yObject + frame.height + padding;
            //     }
            //
            //     frame.setPosition(xObject,yObject);
            //     container.add(frame);
            //     console.log('frame : ', frame);
            //     // Le masque permet de couper les objets
            //     container.setMask(mask);
            // }
        //}
    

    }

    setObjectData(objectData) {
        this.objectData = objectData;
    }

}