import Rooms from "./Rooms";
import { Button } from "../gameObjects/mainMenu/Button";

export default class Places extends Phaser.Scene{
    constructor(handle){
        super(handle);

    }
    preload(){

        // Load the room background
        const placeData = this.cache.json.get('placeData')
        // Change the rooms variable 
        const rooms = placeData.content[0].rooms

        const loadRoomBackground = rooms.map(
            (room)=>{
                this.load.image(room.uuid,'/static/assets/images/rooms/'+room.image)
            }
        )
    }
    create(){
        const placeData = this.cache.json.get('placeData');
        let timer = this.time.addEvent({ delay: 20000, callback: this.onTimerEnd, callbackScope: this });
        // Find an other solution to this double map
        placeData.content
            .filter(({ uuid }) => uuid === this.scene.key)
            .map(({ rooms }) => rooms)
            .flat()
            .filter(({ uuid }) => !this.scene.isActive(uuid))
            .forEach(({ uuid }) => {
            const room = new Rooms(uuid);
            this.scene.add(uuid, room, true);
        })
    }
    onTimerEnd()
    {
        console.log("End Timer")
        if(!this.scene.isActive('reflectionButton')){
            const reflectionButton = new StartReflectionButton('reflectionButton');
            this.scene.add('reflectionButton',reflectionButton,true);
        }
        this.scene.bringToTop('reflectionButton')
    }


}

class StartReflectionButton extends Phaser.Scene {
    constructor(handle) {
        super(handle)
    }

    preload() {
        this.load.image('startReflectionButton','/static/assets/images/menu/reflectionButton.png')
    }

    create() {
        const {width,height} = this.scale;
        const xbutton = width - 300;
        const ybutton = height - 50;
        const startReflection = new Button(xbutton,ybutton,'startReflectionButton',this,()=>{this.onClick()},1.5)
    }

    onClick() {
        console.log("Clicketi Clicketa :)")
    }
}