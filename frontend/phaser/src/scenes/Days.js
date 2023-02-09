import * as Phaser from "phaser";
import Maps from "./Maps";
import axios from "axios";

export default class Days extends Phaser.Scene{
    day;

    constructor(handle, dayData){
        super(handle);
        this.day = dayData;
        console.log('days constructor : ', this.day);
    }

    create(){
        var axiosExperiment = "";

        const initMap = (response) => {
            axiosExperiment = response.message;

            const mapKey = axiosExperiment[0]["map_uuid"];

            if (!this.scene.isActive(mapKey)){
                const map = new Maps(mapKey,axiosExperiment);
                this.scene.add(mapKey,map,true);
            }
            this.scene.bringToTop(mapKey);
        }

        axios.get(`http://localhost:8080/api/day/${this.day}`)
            .then(function (response)
            {
                console.log("\napi map : \n");
                console.log(response.data);
                initMap(response.data);
            })
            .catch((e) => console.log(e));
    }
}