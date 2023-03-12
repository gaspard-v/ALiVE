import Rooms from "./Rooms";
import {isReflectionDelayOver} from "./ReflectionButton.js"
import ReflectionButton from "./ReflectionButton"
import { Button } from "../gameObjects/mainMenu/Button";
import axios from "axios";

export default class Places extends Phaser.Scene{
    axiosExperiment;
    constructor(handle,roomsData){
        super(handle);
        this.rooms = roomsData;
        isReflectionDelayOver.bool = false
    }
    preload(){

    }


    async create() {
        // Timer for the scene
        let timer = this.time.addEvent({delay: 1000, callback: this.onTimerEnd, callbackScope: this});

        // Find an other solution to this double map
        this.rooms
            .filter(({uuid}) => !this.scene.isActive(uuid))
            .forEach(({uuid, objects, doors, roomFile}) => {
                const room = new Rooms(uuid, objects, doors, roomFile);
                this.scene.add(uuid, room, true);
            });
    }

    onTimerEnd()
    {
        isReflectionDelayOver.bool = true
        if(!this.scene.isActive('reflectionButton')){
            const reflectionButton = new ReflectionButton('reflectionButton');
            this.scene.add('reflectionButton',reflectionButton,true);
        }
        this.scene.bringToTop('reflectionButton')
    }
}