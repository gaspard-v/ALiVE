import './buttons.css';
import React from "react";

const Buttons = ({icon, children, type}) => {



    const addObject = event => { 

    }

    return(
        <button className={`ModifyObject ${type}`} onClick={type}>
            {icon}
            <p  className='ModifyObjectText'>{children}</p>
        </button>
    )
}

export default Buttons;