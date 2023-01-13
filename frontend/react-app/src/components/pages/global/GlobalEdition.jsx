import "../page.scss";
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
            <div className="GlobalMenu">
            <a id="Objects" className="GlobalMenuButton" href="/objects"><p>Objets</p><img src={objects} alt="Objets"></img></a>
            <a id="Rooms" className="GlobalMenuButton" href="/rooms"><p>Pièces</p><img src={rooms} alt="Rooms"></img></a>
            <a id="Maps" className="GlobalMenuButton" href="/maps"><p>Carte</p><img src={maps} alt="Maps"></img></a>
            <a id="Days" className="GlobalMenuButton" href="/days"><p>Journées</p><img src={days} alt="Days"></img></a>
            </div>   
        </div>
        </>
    );
}

export default GlobalEdition;