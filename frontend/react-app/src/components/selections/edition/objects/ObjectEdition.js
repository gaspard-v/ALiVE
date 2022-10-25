import "./objects.css";
import React from "react";
import Buttons from "../buttons/Buttons";
import { TiPencil } from "react-icons/ti"
import { RiDeleteBin2Line } from "react-icons/ri"


function ObjectsEdition(){

    return(
        <div id="ObjectEditionScreen">
        
            <Buttons icon={<TiPencil className="ButtonIcon"/>} type="modify">Modifier</Buttons>
            <Buttons icon={<RiDeleteBin2Line className="ButtonIcon"/>} type="delete">Supprimer</Buttons>
            
        </div>
    )

}

export default ObjectsEdition;