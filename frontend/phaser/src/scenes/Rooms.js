import { SearchIcon } from "../gameObjects/mainMenu/Button";
import PromptObject from "./PromptObject";
import {isReflectionDelayOver} from "./ReflectionButton.js"
import ReflectionButton from "./ReflectionButton"

export default class Rooms extends Phaser.Scene{
    constructor(handle,objectsData,doorsData){
        super(handle);
        this.objects = objectsData;
        this.doors = doorsData;

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

        this.doors.map(
            (doorData)=>{
                const door = new SearchIcon(
                    doorData.destinationRoom,
                    doorData.coordinates.x,
                    doorData.coordinates.y,
                    'transitionIcon',
                    this,
                    ()=>{this.chargeRoom(doorData.destinationRoom)},
                    1
                )
            }
        )
        
    }
    chargeRoom(key){
        this.scene.bringToTop(key);
        if (isReflectionDelayOver) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton')
        }
    }

    bringPrompt(objectData){
        const key = objectData.uuid
        if (!this.scene.isActive(key)){
            const promptObject = new PromptObject(key,this.scene.key,objectData)
            this.scene.add(key,promptObject,true)
        }
        this.scene.bringToTop(key)
        if (isReflectionDelayOver) {
            if(!this.scene.isActive('reflectionButton')){
                const reflectionButton = new ReflectionButton('reflectionButton');
                this.scene.add('reflectionButton',reflectionButton,true);
            }
            this.scene.bringToTop('reflectionButton')
        }
    }

}