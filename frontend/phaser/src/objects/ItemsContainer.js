import ItemSelect from "./ItemSelect";

export class ItemContainer{
    objectData;
    title;
    constructor(x,y, {title, data},scene,mask,xRectTopLeft,yRectTopLeft){
        this.title = title;
        this.objectData = data;
        const container = scene.add.container(x,y)
        container.setName('dayInventoryContainer')

        
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
        
        container.setMask(mask);
        
    }

    setObjectData(objectData) {
        this.objectData = objectData;
    }
}