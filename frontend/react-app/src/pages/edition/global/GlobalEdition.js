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
            <button id="Objects" className="EditButton"><p className="ButtonTitle">Objets</p><img src={objects} alt="Objets"></img></button>
            <button id="Rooms" className="EditButton"><p className="ButtonTitle">Pièces</p><img src={rooms} alt="Rooms"></img></button>
            <button id="Maps" className="EditButton"><p className="ButtonTitle">Carte</p><img src={maps} alt="Maps"></img></button>
            <button id="Days" className="EditButton"><p className="ButtonTitle">Journées</p><img src={days} alt="Days"></img></button>
            </div>   
        </div>
        </>
    );
}

export default GlobalEdition;