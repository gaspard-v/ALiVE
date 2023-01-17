import './button.scss';
import React from "react";
import { NavLink } from 'react-router-dom';

const Buttons = ({icon, children,color, type,to}) => {

    
    return(
        <NavLink to={to} className={`ModifyObject ${color}`} type={type}>
            {icon}
            <p className='ModifyObjectText'>{children}</p>
        </NavLink>
    )
}

export default Buttons;