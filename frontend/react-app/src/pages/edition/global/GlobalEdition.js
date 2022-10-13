import "./global.css";
import React from "react";
import SearchBar from "../../../components/searchbar/SearchBar";

function GlobalEdition(){
    return(
        <>
        <div id="globalEdition">
            Edition
            <SearchBar/>
        </div>
        </>
    );
}

export default GlobalEdition;