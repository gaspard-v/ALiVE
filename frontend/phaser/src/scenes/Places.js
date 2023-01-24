import Rooms from "./Rooms";
import { Button } from "../gameObjects/mainMenu/Button";

export default class Places extends Phaser.Scene{
    constructor(handle,roomsData){
        super(handle);
        this.rooms = roomsData;
        console.log(roomsData);

    }
    preload(){
        const loadRoomBackground = this.rooms.map(
            (room)=>{
                this.load.image(room.uuid,'/static/assets/images/rooms/'+room.image)
            }
        )
    }

    create(){
        // Timer for the scene
        let timer = this.time.addEvent({ delay: 20000, callback: this.onTimerEnd, callbackScope: this });

        // Find an other solution to this double map
        this.rooms
            .filter(({ uuid }) => !this.scene.isActive(uuid))
            .forEach(({ uuid,objects,doors}) => {
            const room = new Rooms(uuid,objects,doors);
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