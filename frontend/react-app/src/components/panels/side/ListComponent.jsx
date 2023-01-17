import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.scss";

function ListComponent(props){
    const id = String(props.id)
    const name = props.name;
    const img = props.img;
    const url = props.url;
    return(
        
        <NavLink id="ListComponent" href={url} to={id}>
            <img src={img}></img>
            <p className="ListObjectName">{name}</p>
        </NavLink>
    )

}

export default ListComponent;