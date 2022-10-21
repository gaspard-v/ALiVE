import React from "react";
import ListComponent from "../component/ListComponent";
import SearchBar from "../../../searchbar/SearchBar"
import "./list.css";
import plusIcon from "../../../../ressources/img/component/button/plus-icon-black-2.png"


function ListMenu(props){
    const component = [{"id":1,"img":"t","name":"emoji trist"},{"id":2,"img":"Tet","name":"emoji trist"},{"id":3,"img":"Tet","name":" trist"},{"id":4,"img":"t","name":"emoji trist"},{"id":5,"img":"Tet","name":"emoji trist"},{"id":6,"img":"Tet","name":" trist"},{"id":7,"img":"t","name":"emoji trist"},{"id":8,"img":"Tet","name":"emoji trist"},{"id":1,"img":"t","name":"emoji trist"},{"id":2,"img":"Tet","name":"emoji trist"},{"id":3,"img":"Tet","name":" trist"},{"id":4,"img":"t","name":"emoji trist"},{"id":5,"img":"Tet","name":"emoji trist"},{"id":6,"img":"Tet","name":" trist"},{"id":7,"img":"t","name":"emoji trist"},{"id":8,"img":"Tet","name":"emoji trist"}]
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} img={img} name={name} url={url}/>
        ) ;

    return(
        <div className="Menu">
            <SearchBar/>
            <ul id="ListMenu">
                {listItems}
                <button id="ListComponent">
                    <img className="" src={plusIcon}></img>
                    <p className="objectName">Créer un Objet</p>
                </button>
            </ul>
        </div>        
        
    )
   
    
}

export default ListMenu;