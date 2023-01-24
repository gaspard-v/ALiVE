import Rooms from "./Rooms";

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

}