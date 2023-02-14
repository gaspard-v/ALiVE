import { SearchIcon } from "../gameObjects/mainMenu/Button";
import PromptObject from "./PromptObject";
import {isReflectionDelayOver} from "./ReflectionButton.js"
import ReflectionButton from "./ReflectionButton"
import axios from "axios";

export default class Rooms extends Phaser.Scene{
    constructor(handle,objectsData,doorsData){
        super(handle);
        this.objects = objectsData;
        this.doors = doorsData;
        console.log(objectsData);
        console.log(doorsData);
    }
    preload(){
        
    }
    create(){
        
        const {width,height} = this.scale;
      
        // Background must be added first  
        this.add.sprite(width/2,height/2,this.scene.key); 
                            
        
        this.objects.map((objectData)=>{
            const objectKey = 'image_'+objectData.uuid
            
            if(!this.textures.exists(objectKey)){
                this.textures.addBase64(objectKey,objectData.image)
            }
   
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
                console.log("\nget name destination room : \n");
                console.log(response.data);
                console.log(response.data.message);
                console.log(response.data.message[0]['name']);
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
                        ()=>{this.chargeRoom(doorData["destination_place_uuid"],
                            doorData["destination_room_uuid"])},
                        1
                    )
                })
            }
        )
        
    }
    chargeRoom(key, placekey){
        this.scene.bringToTop(key);
        console.log(isReflectionDelayOver);
        if (isReflectionDelayOver.bool == true) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton')
        }
    }

    bringPrompt(objectData){
        console.log('start bringPrompt object : ', objectData);
        const key = objectData.uuid
        if (!this.scene.isActive(key)){
            const promptObject = new PromptObject(key,this.scene.key,objectData)
            this.scene.add(key,promptObject,true)
        }
        this.scene.bringToTop(key)
        if (isReflectionDelayOver.bool == true) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton')
        }
    }

}