import React from "react";
import {Routes, Route} from 'react-router-dom';
import GlobalEdition from "../../pages/edition/global/GlobalEdition";

export default function Navigator(){
    return(
        <>
            <Routes>
                <Route path={"/"} element={<GlobalEdition/>}></Route>
            </Routes>
        </>
    );
}