import "./global.css";
import React from "react";
import SearchBar from "../../../components/searchbar/SearchBar";
import days from "../../../ressources/img/component/button/Days.jpg";
import rooms from "../../../ressources/img/component/button/Rooms.jpg";
import maps from "../../../ressources/img/component/button/Maps.jpg";
import objects from "../../../ressources/img/component/button/Object.jpg";

function GlobalEdition(){
    return(
        <>
        <div id="globalEdition">
            Edition
            <SearchBar/> 
            <div className="Buttons">
            <button id="Objects" className="EditButton"><img src={objects} alt="Objets"></img></button>
            <button id="Rooms" className="EditButton"><img src={rooms} alt="Rooms"></img></button>
            <button id="Maps" className="EditButton"><img src={maps} alt="Maps"></img></button>
            <button id="Days" className="EditButton"><img src={days} alt="Days"></img></button>
            </div>   
        </div>
        </>
    );
}

export default GlobalEdition;