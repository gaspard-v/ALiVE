import React, { useEffect, useRef, useState } from "react";
import Buttons from "../../buttons/Buttons";
import { TiTick } from "react-icons/ti";
import "./edition.scss";
import {updateRoom} from "../../../api/room/RoomCall";

export default function RoomEdition() {
    // const [form, setFormValue] = useState();
    const [roomName, setRoomName] = useState("");
    const [roomImg, setRoomImg] = useState("");
    const segmentedControl = useRef(null);

    useEffect(() => {
        console.log("edit page loaded")
        //ici va falloir faire un get by room id
        // PUIS :
        // this.this.setRoomName(res.name)
        // this.setRoomImg(res.img)
    }, []);
    function onSubmit(event) {
        event.preventDefault();
        const response = {
            name: roomName,
            img: roomImg
        };
        updateRoom(response);
    }

    return (
        <form id="RoomMapEditionScreen" className="EditionScreen" onSubmit={onSubmit}>
            <label className="NameLabel">Nom de pièce</label>
            <input
                className="ModelName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <input
                className="RoomMapImg"
                type="file"
                name="img"
                accept="image/*"
                value={roomImg}
                onChange={(e) => setRoomImg(e.target.value)}
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
