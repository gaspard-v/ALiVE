import './buttons.css';
import React from "react";
import { useState,useEffect } from 'react';
import ObjectCreation from '../selections/edition/objects/creation/ObjectCreation';



const Buttons = ({icon, children,color, type, trigger}) => {


    return(
        <button className={`ModifyObject ${color}`} type={type} onClick={trigger}>
            {icon}
            <p  className='ModifyObjectText'>{children}</p>
        </button>
    )
}

export default Buttons;