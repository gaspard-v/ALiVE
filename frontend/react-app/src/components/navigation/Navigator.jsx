import React from "react";
import {Routes, Route} from 'react-router-dom';
import DaysEdition from "../../components/pages/days/DaysEdition";
import GlobalEdition from "../../components/pages/global/GlobalEdition";
import MapsEdition from "../../components/pages/maps/MapsEdition";
import ObjectsEdition from "../../components/pages/objects/ObjectsEdition";
import RoomsEdition from "../../components/pages/rooms/RoomsEdition";

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