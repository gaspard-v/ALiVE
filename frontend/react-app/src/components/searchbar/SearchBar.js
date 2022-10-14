import React from "react";
import "./searchbar.css";
import glass from"../../ressources/img/component/search_bar_glass.png"

export default function SearchBar(){
    return(
        <>
        <div id="searchBarObject">
            <button className="searchbar-button">
                <img className="glass" src={glass} alt=""></img>
            </button>
            
            <input className="searchbar" type="text" name="name"></input>
        </div>
        </>
    );
}