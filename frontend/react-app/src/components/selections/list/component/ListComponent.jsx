import React from "react";
import "./component.css";

function ListComponent(props){
    const name = props.name;
    const img = props.img;
    const url = props.url;
    return(
        <button id="ListComponent" href={url}>
            <img src={img}></img>
            <p className="objectName">{name}</p>
        </button>
    )

}

export default ListComponent;