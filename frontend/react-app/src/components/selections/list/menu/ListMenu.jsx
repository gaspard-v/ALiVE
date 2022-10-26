import "./list.css";
import React from "react";
import ListComponent from "../component/ListComponent";
import SearchBar from "../../../searchbar/SearchBar"
import Buttons from "../../edition/buttons/Buttons";
import { HiPlus } from "react-icons/hi"


function ListMenu(props){
    const component = []
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} img={img} name={name} url={url}/>
        ) ;

    return(
        <div className="Menu">
            <SearchBar/>
            <ul className="ListMenu">
                {listItems}
            </ul>
            <Buttons icon={<HiPlus className="ButtonIcon"/>} type="new">Nouveau</Buttons>
        </div>        
        
    )
   
    
}

export default ListMenu;