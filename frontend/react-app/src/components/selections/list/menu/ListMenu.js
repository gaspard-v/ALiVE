import React from "react";
import ListComponent from "../component/ListComponent";
import "./list.css";


function ListMenu(props){
    const component = [{"id":1,"img":"t","name":"emoji trist"},{"id":2,"img":"Tet","name":"emoji trist"},{"id":3,"img":"Tet","name":"emoji trist"}]
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} img={img} name={name} url={url}/>
        ) ;

    return(
        <>
        <ul id="ListMenu">{listItems}</ul>
        </>
    )
   
    
}

export default ListMenu;