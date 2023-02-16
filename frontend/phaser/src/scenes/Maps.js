import {SearchIcon } from "../gameObjects/mainMenu/Button";
import PromptRoom from "./PromptRoom";
import axios from "axios";

export default class Maps extends Phaser.Scene{
    map;

    constructor(handle,mapData){
        super(handle);
        this.map = mapData;
    }

    preload(){
        this.load.json('placeData','/static/assets/json/placeData.json');
        this.load.image('mapbutton','/static/assets/images/utils/reddot.png');
        this.load.image('closeIcon','/static/assets/images/utils/close2.png')
        this.load.image('promptBackground','/static/assets/images/utils/papyrus.jfif');
        this.load.image('placeValidationButton','/static/assets/images/menu/placeValidationButton.png');

    }

    create(){
        // Load all interesting variables
        
        const {width,height} = this.scale;

        
        // Create sprite for the map  
        this.add.sprite(width/2,height/2,this.textures.get(this.map[0]["mapFile"])).setScale(1.3);

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
                //initMap(response.data);
                getAccessiblePlaces(response.data);

            })
            .catch((e) => console.log(e));

    }

    displayRoomInfo(place){
        const key = place.uuid+"Prompt";
        if(!this.scene.isActive(key)){
            const display = new PromptRoom(key,this,place);
            this.scene.add(key,display,true);
        }
        this.scene.bringToTop(key);
    }
}