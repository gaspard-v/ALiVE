import "./objects.css";
import React from "react";
import SearchBar from "../../../components/searchbar/SearchBar";
import ListComponent from "../../../components/selections/list/component/ListComponent";

function ObjectsEdition(){
    return(
        <>
        <div id="objectEdition">
            <SearchBar/>
            <ListComponent/>
        </div>
        </>
    )

}

export default ObjectsEdition;