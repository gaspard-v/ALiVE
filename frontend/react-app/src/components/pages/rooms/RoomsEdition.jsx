import "./rooms.css";
import React, {useState} from "react";
import ListMenu from "../../panels/side/listmenu/ListMenu";
import RoomPrompt from "../../../components/panels/prompt/RoomPrompt";
import RoomCreation from "../../../components/panels/creation/RoomCreation";

function RoomsEdition(){
    const [currentSection,setCurrentSection] = useState(<RoomPrompt/>);

    return(
        <div id="roomEdition">
        <ListMenu sectionChanger={setCurrentSection} contextName="Mes Pièces" section={<RoomCreation/>}/>
            {currentSection}
        </div>
    )

}

export default RoomsEdition;