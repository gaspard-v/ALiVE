import React, {useRef, useState} from "react";
import Buttons from "../../buttons/Buttons";
import {TiPencil} from "react-icons/ti";
import {RiDeleteBin2Line} from "react-icons/ri";
import "./prompt.scss";

function MapPrompt(){
    const [mapName,setMapName] = useState("Nom de carte");
    const [mapImg, setMapImg] = useState("");

    return(
        <div id="RoomMapPromptScreen" className="EditionScreen">
            <h1 className="ModelName">{mapName}</h1>
            <img className="RoomMapImg" src={mapImg} alt='map image'/>
            <Buttons icon={<TiPencil className="ButtonIcon"/>} to="edit" color="modify">Modifier</Buttons>
            <Buttons icon={<RiDeleteBin2Line className="ButtonIcon"/>} color="delete">Supprimer</Buttons>
        </div>
    )
}

export default MapPrompt;