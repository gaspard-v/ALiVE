import "./list.css";
import React from "react";
import ListComponent from "../component/ListComponent";
import SearchBar from "../../../searchbar/SearchBar"
import Buttons from "../../edition/buttons/Buttons";
import { HiPlus, HiHome } from "react-icons/hi"

function ListMenu(props){
    const component = []
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} img={img} name={name} url={url}/>
        ) ;

    return(
        <div className="Menu">
            <SearchBar/>
            <Buttons icon={<HiHome className="ButtonIcon"/>} type="back"></Buttons> 
            <h2 className="MenuTitle">Mes objets</h2>
            <ul className="ListMenu">
                {listItems}
            </ul>
            <Buttons icon={<HiPlus className="ButtonIcon"/>} type="new">Nouveau</Buttons>
        </div>        
        
    )
   
    
}

export default ListMenu;