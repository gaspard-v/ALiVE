
export class Button {
    constructor(x, y, texture, scene, callback,scale) {
        const button = scene.add.sprite(x, y, texture)
            .setScale(scale)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setScale(scale-0.02*scale))
            .on('pointerout',() => button.setScale(scale))
    }
}


export class SearchIcon {
    constructor(objectName, x, y, texture, scene, callback, scale){
        var text;
        const searchIcon = scene.add.sprite(x,y,texture)
            .setInteractive({useHandCursor:true})
            .setScale(scale)
            .on('pointerdown',() => callback())
            .on('pointerover',() => {
                searchIcon.setScale(scale+0.2*scale);
                this.namePrompt(x,y,scene,objectName);
            })
            .on('pointerout',() => {
                this.nameUnPrompt();
                searchIcon.setScale(scale);
            })
    }
    namePrompt(x,y,scene,objectName){
        this.text = scene.add.text(
            x,
            y-60,
            objectName,
            {
            backgroundColor:'#111',
            fontSize:25}
            );
    
    }
    nameUnPrompt(scene){
        this.text.destroy()
    }

}