import "./rooms.css";
import React, {useState} from "react";
import ListMenu from "../../../components/selections/list/menu/ListMenu";
import RoomPrompt from "../../../components/selections/edition/rooms/prompt/RoomPrompt";
import RoomCreation from "../../../components/selections/edition/rooms/creation/RoomCreation";

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