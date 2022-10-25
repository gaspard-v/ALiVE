import "./objects.css";
import React from "react";
import ListMenu from "../../../components/selections/list/menu/ListMenu";
import ObjectEdition from "../../../components/selections/edition/objects/ObjectEdition";

function ObjectsEdition(){

    return(
        <div id="objectEdition">
            <ListMenu/>
            <ObjectEdition/>
        </div>
    )

}

export default ObjectsEdition;