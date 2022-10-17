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
            <SearchBar className="GlobalSearchBar"/> 
            <div className="Buttons">
            <button id="Objects" className="EditButton"><img src={objects} alt="Objets"></img><p className="ButtonTitle">Objets</p></button>
            <button id="Rooms" className="EditButton"><img src={rooms} alt="Rooms"></img><p className="ButtonTitle">Pièces</p></button>
            <button id="Maps" className="EditButton"><img src={maps} alt="Maps"></img><p className="ButtonTitle">Carte</p></button>
            <button id="Days" className="EditButton"><img src={days} alt="Days"></img><p className="ButtonTitle">Journées</p></button>
            </div>   
        </div>
        </>
    );
}

export default GlobalEdition;