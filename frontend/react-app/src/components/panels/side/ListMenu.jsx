import "./menu.scss";
import React from "react";
import ListComponent from "./ListComponent";
import SearchBar from "../../searchbar/SearchBar"
import Buttons from "../../buttons/Buttons";
import { HiPlus, HiHome } from "react-icons/hi";

function ListMenu({contextName}){
    const component = [{id:1,name:"Template",img:"",url:""},{id:2,name:"Template",img:"",url:""},{id:3,name:"Template",img:"",url:""}]
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} id={id} img={img} name={name} url={url}/>
        ) ;
    const context = contextName;
    
    return(
        <div className="SideMenu">
            <SearchBar/>
            <Buttons to='/' icon={<HiHome className="ButtonIcon"/>} color="goHome"></Buttons>
            <h2 className="MenuTitle">{context}</h2>
            <ul className="MenuList">
                {listItems}
            </ul>
            <Buttons icon={<HiPlus className="ButtonIcon"/>} to="new" color="addObject">Nouveau</Buttons>
        </div>        
        
    )
   
    
}

export default ListMenu;