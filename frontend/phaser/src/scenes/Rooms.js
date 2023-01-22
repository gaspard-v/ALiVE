import { SearchIcon } from "../gameObjects/mainMenu/Button";

export default class Rooms extends Phaser.Scene{
    constructor(handle){
        super(handle)

    }
    preload(){
        
        this.load.json('class1','/static/assets/json/objectData.json');
    }
    create(){
        
        const {width,height} = this.scale;
        const classData = this.cache.json.get('class1');

        this.add.sprite(width/2,height/2,'img'); 
        
        const createObjects = classData.content[0].objects.map(
            (objectData)=>{
                const object = new SearchIcon(
                    objectData.name,
                    objectData.x,
                    objectData.y,
                    'searchIcon',
                    this,
                    ()=>{console.log(objectData.name)},
                    1
                )

            }
        )

        const createDoors = classData.content[0].doors.map(
            (doorData)=>{
                const door = new SearchIcon(
                    doorData.destinationRoom,
                    doorData.coordinates.x,
                    doorData.coordinates.y,
                    'transitionIcon',
                    this,
                    ()=>{console.log(doorData.destinationRoom)},
                    1
                )

                
            }
        )
        
    }
   

}