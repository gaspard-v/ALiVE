import {SearchIcon } from "../gameObjects/mainMenu/Button";
import PromptRoom from "./PromptRoom";
import axios from "axios";

export default class Maps extends Phaser.Scene{
    map;

    constructor(handle,mapData){
        super(handle);
        this.map = mapData;
        console.log(this.map);
    }

    preload(){
        this.load.json('placeData','/static/assets/json/placeData.json');
        this.load.image('testmap',"/static/assets/images/maps/mapTest1.png" );
        this.load.image('mapbutton','/static/assets/images/utils/blackdot.png');
    }

    create(){
        // Load all interesting variables
        const {width,height} = this.scale;
        
        // Create sprite for the map  
        this.add.sprite(width/2,height/2,'testmap').setScale(1.3);

        var axiosExperiment = "";

        const initMap = (response) => {
            axiosExperiment = response.message;

            const mapKey = axiosExperiment[0].uuid;

            if (!this.scene.isActive(mapKey)){
                const map = new Maps(mapKey,axiosExperiment);
                this.scene.add(mapKey,map,true);
            }
            this.scene.bringToTop(mapKey);
        }

        const getAccessiblePlaces = (response) => {
            // Parsing data and creating the map buttons
            console.log('debug : ', response.message[0]);
            response.message[0].places.map((place) => {
                const button = new SearchIcon(
                    place.name,
                    place.x,
                    place.y,
                    'mapbutton',
                    this,
                    () => {this.displayRoomInfo(place)},
                    0.080
                )
            })
        }

        axios.get(`http://localhost:8080/api/map/${this.map[0]["map_uuid"]}`, {
            params: {
                full: true
            }
        })
            .then(function (response)
            {
                console.log("\nget all places of map : \n");
                console.log(response.data);
                getAccessiblePlaces(response.data);

            })
            .catch((e) => console.log(e));

    }

    displayRoomInfo(place){
        console.log('diplayRoom place infos : ', place);
        const key = place.uuid+"Prompt";
        if(!this.scene.isActive(key)){
            const display = new PromptRoom(key,this,place);
            this.scene.add(key,display,true);
        }
        this.scene.bringToTop(key);
    }
}