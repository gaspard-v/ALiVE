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
            <a id="Objects" className="EditButton" href="/edition/objects"><p className="ButtonTitle">Objets</p><img src={objects} alt="Objets"></img></a>
            <a id="Rooms" className="EditButton" href="/edition/rooms"><p className="ButtonTitle">Pièces</p><img src={rooms} alt="Rooms"></img></a>
            <a id="Maps" className="EditButton" href="/edition/maps"><p className="ButtonTitle">Carte</p><img src={maps} alt="Maps"></img></a>
            <a id="Days" className="EditButton" href="/edition/days"><p className="ButtonTitle">Journées</p><img src={days} alt="Days"></img></a>
            </div>   
        </div>
        </>
    );
}

export default GlobalEdition;