import './buttons.css';
import React from "react";

const Buttons = ({icon, children, type}) => {
    return(
        <button className={`ModifyObject ${type}`}>
            {icon}
            <p  className='ModifyObjectText'>{children}</p>
        </button>
    )
}

export default Buttons;