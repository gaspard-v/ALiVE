import React, {useRef, useState} from "react";
import Buttons from "../../buttons/Buttons";
import {TiPencil} from "react-icons/ti";
import {RiDeleteBin2Line} from "react-icons/ri";
import "./prompt.scss";

function RoomPrompt({name,img}){
    const [roomName,setRoomName] = useState("Nom de pièce");


    return(
<<<<<<< HEAD
        <div id="RoomEditionScreen" className="roomPrompt">
            <h1 className="roomName">{roomName}</h1>
            <img className="roomImg" src={img} alt='room image'/>
            <Buttons icon={<TiPencil className="ButtonIcon"/>} color="modify">Modifier</Buttons>
=======
        <div id="RoomEditionScreen" className="Prompt">
            <h1 className="ModelName">{roomName}</h1>
            <img className="RoomImg" src={img} alt='room image'/>
            <Buttons icon={<TiPencil className="ButtonIcon"/>} to="edit" color="modify">Modifier</Buttons>
>>>>>>> ad70c80 (Object creation refacto)
            <Buttons icon={<RiDeleteBin2Line className="ButtonIcon"/>} color="delete">Supprimer</Buttons>
        </div>
    )
}

export default RoomPrompt;