import React, {useRef, useState} from "react";
import createObject from "../../../../../api/object/ObjectCall";
import SegmentedControl from "../../../../segmented/SegmentedControl";
import Buttons from "../../../../buttons/Buttons";
import {TiTick} from "react-icons/ti";

function RoomCreation(){

    const [selectedValue1, setSelectedValue1] = useState("complete");
    // const [form, setFormValue] = useState();
    const [roomName,setRoomName] = useState("");
    const [roomImg,setRoomImg] = useState("");
    const segmentedControl = useRef(null)

    function onSubmit(event){
        event.preventDefault();
        const response = {
            name:roomName,
            img:roomImg,
            isTool:1}
        createObject(response);

    }

    return(
        <form id="RoomEditionScreen" className="roomCreation" onSubmit={onSubmit}>
            <label className="roomName" value={roomName} onChange={e => setRoomName(e.target.value)}></label>
            <input className="roomImg" type="file" name="img" accept="image/*" value={roomImg} onChange={e => setRoomImg(e.target.value)}></input>
            <Buttons icon={<TiTick className="ButtonIcon"/>} color="validate" type="submit">Valider</Buttons>
        </form>
    )

}

export default RoomCreation;