import "../page.scss";
import React from "react";
import ListMenu from "../../panels/side/ListMenu";
import { Outlet } from "react-router";

function ObjectsEdition(){

    return(
        <div className="EditionPage">
            <ListMenu contextName="Mes objets"/>
            <Outlet/>
        </div>
    )

}

export default ObjectsEdition;