import './button.scss';
import React from "react";
<<<<<<< HEAD
import { useState,useEffect } from 'react';
import ObjectCreation from '../panels/creation/ObjectCreation';



=======
import { NavLink } from 'react-router-dom';
>>>>>>> ad70c80 (Object creation refacto)

const Buttons = ({icon, children,color, type,to}) => {

    
    return(
        <NavLink to={to} className={`ModifyObject ${color}`} type={type}>
            {icon}
            <p className='ModifyObjectText'>{children}</p>
        </NavLink>
    )
}

export default Buttons;