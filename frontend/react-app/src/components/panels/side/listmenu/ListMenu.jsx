import "./list.scss";
import React from "react";
import ListComponent from "../listcomponent/ListComponent";
import SearchBar from "../../../searchbar/SearchBar"
import Buttons from "../../../buttons/Buttons";
import { HiPlus, HiHome } from "react-icons/hi";
import ObjectCreation from "../../creation/ObjectCreation";
import { Navigate, useNavigate  } from "react-router-dom";

function ListMenu({sectionChanger}){
    const navigate = useNavigate();
    const component = [{id:1,name:"Template",img:"",url:""},{id:2,name:"Template",img:"",url:""},{id:3,name:"Template",img:"",url:""}]
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} img={img} name={name} url={url}/>
        ) ;

    return(
        <div className="SideMenu">
            <SearchBar/>
            <Buttons icon={<HiHome className="ButtonIcon"/>} color="goHome" trigger={() => navigate("/")}></Buttons>
            <h2 className="MenuTitle">Mes objets</h2>
            <ul className="MenuList">
                {listItems}
            </ul>
            <Buttons icon={<HiPlus className="ButtonIcon"/>} color="addObject" trigger={() => sectionChanger(<ObjectCreation/>)}>Nouveau</Buttons>
        </div>        
        
    )
   
    
}

export default ListMenu;