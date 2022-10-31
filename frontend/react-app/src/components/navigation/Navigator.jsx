import React from "react";
import {Routes, Route} from 'react-router-dom';
import DaysEdition from "../../pages/edition/days/DaysEdition";
import GlobalEdition from "../../pages/edition/global/GlobalEdition";
import MapsEdition from "../../pages/edition/maps/MapsEdition";
import ObjectsEdition from "../../pages/edition/objects/ObjectsEdition";
import RoomsEdition from "../../pages/edition/rooms/RoomsEdition";

export default function Navigator(){
    return(
        <>
            <Routes>
                <Route path={"/"} element={<GlobalEdition/>}></Route>
                <Route path={"/edition/objects"} element={<ObjectsEdition/>}></Route>
                <Route path={"/edition/rooms"} element={<RoomsEdition/>}></Route>
                <Route path={"/edition/days"} element={<DaysEdition/>}></Route>
                <Route path={"/edition/maps"} element={<MapsEdition/>}></Route>
            </Routes>
        </>
    );
}