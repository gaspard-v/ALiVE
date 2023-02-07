import * as Phaser from "phaser";
import Maps from "./Maps";
import axios from "axios";

export default class Days extends Phaser.Scene{
    day;

    constructor(handle, dayData){
        super(handle);
        this.day = dayData;
    }

    create(){
        var axiosExperiment = "";

        const chargeMapImage = async (response) => {
            const uuidMapImg = response[0]["map_uuid"];
            return axios.get(`http://localhost:8080/api/file/map/${uuidMapImg}`)
                .then((responseFetch) => {
                    const objectKey = 'image_' + responseFetch.data.message[0]["uuid"];
                    response[0]['mapFile'] = objectKey;
                    if (!this.textures.exists(objectKey)) {
                        this.textures.addBase64(objectKey, responseFetch.data.message[0]["data"])
                    }
                    return response;
                })
                .catch((e) => console.log(e));
        }

        const initMap = async (response) => {
            axiosExperiment = response.message;

            axiosExperiment = await chargeMapImage(response.message);

            const mapKey = axiosExperiment[0]["map_uuid"];

            if (!this.scene.isActive(mapKey)) {
                const map = new Maps(mapKey, axiosExperiment);
                this.scene.add(mapKey, map, true);
            }
            this.scene.bringToTop(mapKey);
        }

        axios.get(`http://localhost:8080/api/day/${this.day}`)
            .then(function (response)
            {
                //initMap(response.data);
                console.log("\napi place : \n");
                console.log(response.data);
            })
            .catch((e) => console.log(e));

        axios.get('http://localhost:8080/api/map', {
            params: {
                full: true
            }
        })
            .then(function (response)
            {
                console.log("\napi map : \n");
                console.log(response.data);
                initMap(response.data);
            })
            .catch((e) => console.log(e));
    }
}
