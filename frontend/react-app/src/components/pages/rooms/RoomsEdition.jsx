import "./rooms.css";
import React, {useState} from "react";
import ListMenu from "../../panels/side/ListMenu";
import { Outlet } from "react-router";

function RoomsEdition(){
    return(
        <div id="roomEdition">
        <ListMenu  contextName="Mes Pièces"/>
        <Outlet/>
        </div>
    )

}

export default RoomsEdition;