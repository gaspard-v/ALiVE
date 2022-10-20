import "./objects.css";
import React from "react";
import SearchBar from "../../../components/searchbar/SearchBar";
import ListMenu from "../../../components/selections/list/menu/ListMenu";


function ObjectsEdition(){



    return(
        <>
        <div id="objectEdition">
            <SearchBar/>
            <ListMenu/>
        </div>
        </>
    )

}

export default ObjectsEdition;