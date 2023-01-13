import "../page.scss";
import React from "react";
import ListMenu from "../../panels/side/ListMenu";
import { Outlet } from "react-router";

function Selection({context}){

    const contextName = context;
    return(
        <div className="SelectionPage">
            <ListMenu contextName={contextName}/>
            <Outlet/>
        </div>
    )

}

export default Selection;