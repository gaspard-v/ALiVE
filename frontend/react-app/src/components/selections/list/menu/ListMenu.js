import "./list.css";
import React from "react";
import ListComponent from "../component/ListComponent";
import SearchBar from "../../../searchbar/SearchBar"
import Buttons from "../../edition/buttons/Buttons";
import { HiPlus } from "react-icons/hi"


function ListMenu(props){
    const component = [{"id":1,"img":"t","name":"emoji trist"},{"id":2,"img":"Tet","name":"emoji trist"},{"id":3,"img":"Tet","name":" trist"},{"id":4,"img":"t","name":"emoji trist"},{"id":5,"img":"Tet","name":"emoji trist"},{"id":6,"img":"Tet","name":" trist"},{"id":7,"img":"t","name":"emoji trist"},{"id":8,"img":"Tet","name":"emoji trist"},{"id":9,"img":"t","name":"emoji trist"},{"id":10,"img":"Tet","name":"emoji trist"},{"id":11,"img":"Tet","name":" trist"},{"id":12,"img":"t","name":"emoji trist"},{"id":13,"img":"Tet","name":"emoji trist"},{"id":14,"img":"Tet","name":" trist"},{"id":15,"img":"t","name":"emoji trist"},{"id":16,"img":"Tet","name":"emoji trist"}]
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} img={img} name={name} url={url}/>
        ) ;

    return(
        <div className="Menu">
            <SearchBar/>
            <ul id="ListMenu">
                {listItems}
            </ul>
            <Buttons icon={<HiPlus className="ButtonIcon"/>} type="new">Nouveau</Buttons>
        </div>        
        
    )
   
    
}

export default ListMenu;