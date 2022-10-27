import "./objects.css";
import React from "react";
import { useState,useEffect } from "react";
import ListMenu from "../../../components/selections/list/menu/ListMenu";
import ObjectPrompt from "../../../components/selections/edition/objects/prompt/ObjectPrompt"
import ObjectCreation from "../../../components/selections/edition/objects/creation/ObjectCreation";

function ObjectsEdition(){

    const[currentSection,setCurrentSection] = useState(<ObjectPrompt/>)


    return(
        <div id="objectEdition">
            <ListMenu sectionChanger={setCurrentSection}/>
            {currentSection}
        </div>
    )

}

export default ObjectsEdition;