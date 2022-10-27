import './buttons.css';
import React from "react";
import { useState,useEffect } from 'react';
import ObjectCreation from '../objects/creation/ObjectCreation';



const Buttons = ({icon, children, type, trigger}) => {


    return(
        <button className={`ModifyObject ${type}`} onClick={trigger}>
            {icon}
            <p  className='ModifyObjectText'>{children}</p>
        </button>
    )
}

export default Buttons;