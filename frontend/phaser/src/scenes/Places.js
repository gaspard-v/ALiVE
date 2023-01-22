import Rooms from "./Rooms";

export default class Places extends Phaser.Scene{
    constructor(handle){
        super(handle);

    }
    preload(){
        const mapData = this.cache.json.get('mapData')
        const background = mapData.content[0].backgroundPath
        this.load.image('img',background)
    }
    create(){
        const placeData = this.cache.json.get('placeData');
        
        const rooms = placeData.content.map(
            (place)=>{ 
                if (place.uuid == this.scene.key){
                    place.rooms.map(
                        (roomData) =>{
                            console.log(roomData.uuid);
                            if (!this.scene.isActive(roomData.uuid)){
                                const room = new Rooms(roomData.uuid)
                                this.scene.add(room.uuid,room,true)
                            }
                        
                        }
                    )
                }
            }
        )
    }

}