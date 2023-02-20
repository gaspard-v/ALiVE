import ItemSelect from "./ItemSelect";

export class ItemContainer{
    constructor(x,y,objectData,scene,mask,xRectTopLeft,yRectTopLeft){

        const container = scene.add.container(x,y)
        
        let xObject = 100;
        let yObject = -250; 
    
        objectData.map((object,index)=>{
            const frame = scene.add.sprite(xObject,yObject,'itemFrame');
            const padding = frame.height/4;

            const imageObject = scene.add.sprite(xObject,yObject,"image_"+object.object)
            if(index%2 == 0){
                xObject = xObject*(-1);
            }
            else{
                yObject = yObject + frame.height + padding;
                
            }
            
            frame.setPosition(xObject,yObject);
            imageObject.setScale(frame.width/imageObject.width,frame.height/imageObject.height)
            container.add(imageObject);
            container.add(frame);

            
            // Le masque permet de couper les objets 
            container.setMask(mask);
            
        });   
    }

}