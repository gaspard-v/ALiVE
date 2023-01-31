import * as Phaser from "phaser";
import Maps from "./Maps";
import axios from "axios";

export default class Days extends Phaser.Scene{
    constructor(handle){
        super(handle);
    }

    create(){
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

        axios.get('http://localhost:8080/api/place')
            .then(function (response)
            {
                initMap(response.data);
            })
            .catch((e) => console.log(e));
    }
}