import React from "react";
import ListComponent from "../component/ListComponent";
import "./list.css";


function ListMenu(props){
    const component = [{"img":"Tet","name":"emoji trist"},{"img":"Tet","name":"emoji trist"},{"img":"Tet","name":"emoji trist"},{"img":"Tet","name":"emoji trist"}]
    const listItems = component.map(({name,img}) => 
            <ListComponent img={img} name={name}/>
        ) ;

    return(
        <ul id="ListMenu">{listItems}</ul>
    )
   
    
}

export default ListMenu;