import "./objects.css";
import React from "react";
import ListMenu from "../../../components/selections/list/menu/ListMenu";
import ObjectPrompt from "../../../components/selections/edition/objects/prompt/ObjectPrompt"
import ObjectCreation from "../../../components/selections/edition/objects/creation/ObjectCreation";

function ObjectsEdition(){

    return(
        <div id="objectEdition">
            <ListMenu/>
            <ObjectCreation/>
            {/* <ObjectPrompt/> */}
        </div>
    )

}

export default ObjectsEdition;