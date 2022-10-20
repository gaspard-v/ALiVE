import React from "react";
import "./component.css";

function ListComponent(props){
    const name = props.name;
    const img = `data:image/png;base64,${props.img}`;
    return(
        <div id="ListComponent">
            <img src={img}></img>
            <p className="objectName">{name}</p>
        </div>
    )

}

export default ListComponent;