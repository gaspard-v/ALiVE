import "./edition.scss";
import { useRef, useState, useEffect } from "react";
import React from "react";
import Buttons from "../../buttons/Buttons";
import { TiTick } from "react-icons/ti";
import {updateMap} from "../../../api/map/MapCalls";

export default function MapEdition() {
    // const [form, setFormValue] = useState();
    const [mapName, setMapName] = useState("");
    const [mapImg, setMapImg] = useState("");
    const segmentedControl = useRef(null);

    useEffect(() => {
        console.log("edit page loaded")
        //ici va falloir faire un get by map id
        // PUIS :
        // this.this.setRoomName(res.name)
        // this.setRoomImg(res.img)
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        const response = {
            name: mapName,
            img: mapImg
        };
        updateMap(response);
    }

    return (
        <form id="RoomMapEditionScreen" className="EditionScreen" onSubmit={onSubmit}>
            <label className="NameLabel">Nom de carte</label>
            <input
                className="ModelName"
                value={mapName}
                onChange={(e) => setMapName(e.target.value)}
            />
            <input
                className="RoomMapImg"
                type="file"
                name="img"
                accept="image/*"
                value={mapImg}
                onChange={(e) => setMapImg(e.target.value)}
            ></input>
            <Buttons
                icon={<TiTick className="ButtonIcon" />}
                color="validate"
                to="../1"
                type="submit"
            >
                Valider
            </Buttons>
        </form>
    );
}