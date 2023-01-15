import React, {useRef, useState} from "react";
import {createObject, createObjectv2, getObjects} from "../../../api/object/ObjectCall";
import Buttons from "../../buttons/Buttons";
import {TiTick} from "react-icons/ti";
import './creation.scss';

function RoomCreation(){

    //const [selectedValue1, setSelectedValue1] = useState("complete");
    // const [form, setFormValue] = useState();
    const [roomName,setRoomName] = useState("");
    const [roomImg,setRoomImg] = useState("");
    const segmentedControl = useRef(null);

    function onSubmit(event){
        event.preventDefault();
        const response = {
            name:roomName,
            img:roomImg,
            isTool:1}
        createObject(response);

    }

    return(
        <form id="EditionScreen" className="RoomScreenCreation" onSubmit={onSubmit}>
            <label className="NameLabel">Nom de pièce</label>
            <input className="ModelName" value={roomName} onChange={e => setRoomName(e.target.value)}/>
            <input className="RoomImg" type="file" name="img" accept="image/*" value={roomImg} onChange={e => setRoomImg(e.target.value)}></input>
            <Buttons icon={<TiTick className="ButtonIcon"/>} color="validate" to='../1' type="submit">Valider</Buttons>
        </form>
    )

}

export default RoomCreation;