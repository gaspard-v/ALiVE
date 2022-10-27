import "./list.css";
import React from "react";
import ListComponent from "../component/ListComponent";
import SearchBar from "../../../searchbar/SearchBar"
import Buttons from "../../edition/buttons/Buttons";
import { HiPlus, HiHome } from "react-icons/hi";
import ObjectCreation from "../../edition/objects/creation/ObjectCreation";
import { Navigate, useNavigate  } from "react-router-dom";

function ListMenu({sectionChanger}){
    const navigate = useNavigate();
    const component = [{id:1,name:"Bouteille",img:"",url:""}]
    const listItems = component.map(({id,name,img,url}) => 
            <ListComponent key={id} img={img} name={name} url={url}/>
        ) ;


    return(
        <div className="Menu">
            <SearchBar/>
            <Buttons icon={<HiHome className="ButtonIcon"/>} type="goHome" trigger={() => navigate("/")}></Buttons> 
            <h2 className="MenuTitle">Mes objets</h2>
            <ul className="ListMenu">
                {listItems}
            </ul>
            <Buttons icon={<HiPlus className="ButtonIcon"/>} type="addObject" trigger={() => sectionChanger(<ObjectCreation/>)}>Nouveau</Buttons>
        </div>        
        
    )
   
    
}

export default ListMenu;