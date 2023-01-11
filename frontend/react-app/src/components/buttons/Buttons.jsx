import './button.scss';
import React from "react";
import { useState,useEffect } from 'react';
import ObjectCreation from '../panels/creation/ObjectCreation';



const Buttons = ({icon, children,color, type, trigger}) => {

const Buttons = ({icon, children,color, type,to}) => {

    
    return(
        <NavLink to={to} className={`ModifyObject ${color}`} type={type}>
            {icon}
            <p className='ModifyObjectText'>{children}</p>
        </NavLink>
    )
}

export default Buttons;