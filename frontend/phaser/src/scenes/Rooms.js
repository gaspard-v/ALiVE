import { SearchIcon } from "../gameObjects/mainMenu/Button";

export default class Rooms extends Phaser.Scene{
    constructor(handle){
        super(handle)

    }
    preload(){
        this.load.json('class1','/static/assets/json/objectData.json') 
    }
    create(){
        
        const {width,height} = this.scale;
        const classData = this.cache.json.get('class1');

        // Background must be added first  
        this.add.sprite(width/2,height/2,this.scene.key); 
       
        // objects and door variables can be changed
        const placeData = this.cache.json.get('placeData');
        const objects = placeData.content
                        .filter(({uuid}) => uuid === "place1")
                        .map(({rooms}) => rooms)
                        .flat()
                        .filter(({uuid}) => uuid === this.scene.key)
                        .map(({objects}) =>objects)
                        .flat()
                        
  
        const doors =  placeData.content
                        .filter(({uuid}) => uuid === "place1")
                        .map(({rooms}) => rooms)
                        .flat()
                        .filter(({uuid}) => uuid === this.scene.key)
                        .map(({doors}) =>doors)
                        .flat()
                        
        
        objects.map((objectData)=>{
            console.log(objectData)
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

        doors.map(
            (doorData)=>{
                console.log(doorData)
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
    }

    bringPrompt(key){
        if (!this.scene.isActive('key')){
        }
    }


}