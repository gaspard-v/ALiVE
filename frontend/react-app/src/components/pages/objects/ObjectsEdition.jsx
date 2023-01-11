import "./objects.css";
import React from "react";
import { useState,useEffect } from "react";
import ListMenu from "../../panels/side/listmenu/ListMenu";
import ObjectPrompt from "../../../components/panels/prompt/ObjectPrompt"
import ObjectCreation from "../../panels/creation/ObjectCreation";

function ObjectsEdition(){

    const[currentSection,setCurrentSection] = useState(<ObjectPrompt/>)

    return(
        <div id="objectEdition">
            <ListMenu sectionChanger={setCurrentSection} contextName="Mes objets" section={<ObjectCreation/>} />
            {currentSection}
        </div>
    )

}

export default ObjectsEdition;