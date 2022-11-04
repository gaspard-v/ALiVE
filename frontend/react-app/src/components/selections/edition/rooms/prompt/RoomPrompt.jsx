import React, {useRef, useState} from "react";
import Buttons from "../../../../buttons/Buttons";
import {TiPencil} from "react-icons/ti";
import {RiDeleteBin2Line} from "react-icons/ri";
import "./prompt.css";

function RoomPrompt({name,img}){
    const roomName = name

    return(
        <div id="RoomEditionScreen">
            <h1 className="roomName">{roomName}</h1>
            <img className="roomImg" src={img} alt='room image'/>
            <Buttons icon={<TiPencil className="ButtonIcon"/>} color="modify">Modifier</Buttons>
            <Buttons icon={<RiDeleteBin2Line className="ButtonIcon"/>} color="delete">Supprimer</Buttons>
        </div>
    )
}

export default RoomPrompt;