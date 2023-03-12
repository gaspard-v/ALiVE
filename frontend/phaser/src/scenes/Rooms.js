import { SearchIcon } from "../gameObjects/mainMenu/Button";
import PromptObject from "./PromptObject";
import {isReflectionDelayOver} from "./ReflectionButton.js"
import ReflectionButton from "./ReflectionButton"
import axios from "axios";

export default class Rooms extends Phaser.Scene{
    constructor(handle,objectsData,doorsData, roomFile){
        super(handle);
        this.objects = objectsData;
        this.doors = doorsData;
        this.uuid = handle
        this.roomFile = roomFile;
        // console.log('textures : ', this.textures.get(this.roomFile));
    }
    preload(){
        
    }

    create(){
        
        const {width,height} = this.scale;
      
        // Background must be added first  
        this.add.sprite(width / 2, height / 2, this.roomFile);

        this.objects.map((objectData)=>{
            const object = new SearchIcon(
                objectData.name,
                    objectData.x,
                    objectData.y,
                    'searchIcon',
                    this,
                    ()=>{this.bringPrompt(objectData)},
                    1
                )
            }
        )

        const getNameDestinationRoom = async (uuid) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/room/${uuid}`)
                return (response.data.message[0]['name']);
            } catch(err) {
                console.error(err)
            }

        }

        this.doors.map(
            (doorData)=>{
                getNameDestinationRoom(doorData["destination_room_uuid"]).then((name_destination_room) => {
                    const door = new SearchIcon(
                        name_destination_room,
                        doorData.x,
                        doorData.y,
                        'transitionIcon',
                        this,
                        ()=>{this.chargeRoom(doorData["destination_room_uuid"])},
                        1
                    )
                })
            }
        )
        
    }

    chargeRoom(key){
        this.scene.bringToTop(key);
        if (isReflectionDelayOver.bool == true) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton');
        }
    }

    bringPrompt(objectData){
        const key = objectData.uuid
        if (!this.scene.isActive(key)){
            const promptObject = new PromptObject(key,this.scene.key,objectData)
            this.scene.add(key,promptObject,true)
        }
        this.scene.launch(key);
        this.scene.setActive(false);
        // Again copy/paste
        if (isReflectionDelayOver.bool == true) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton');
        }
    }

}
