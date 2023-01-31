import Rooms from "./Rooms";
import {flag} from "./ReflectionButton.js"
import ReflectionButton from "./ReflectionButton"
import { Button } from "../gameObjects/mainMenu/Button";

export default class Places extends Phaser.Scene{
    constructor(handle,roomsData){
        super(handle);
        this.rooms = roomsData;
        flag.bool = false
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
        let timer = this.time.addEvent({ delay: 2000, callback: this.onTimerEnd, callbackScope: this });

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
        console.log(flag.bool)
        flag.bool = true
        console.log(flag.bool)
        if(!this.scene.isActive('reflectionButton')){
            const reflectionButton = new ReflectionButton('reflectionButton');
            this.scene.add('reflectionButton',reflectionButton,true);
        }
        this.scene.bringToTop('reflectionButton')
    }
}