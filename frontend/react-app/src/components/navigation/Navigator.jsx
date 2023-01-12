import React from "react";
import {Routes, Route } from 'react-router-dom';
import DaysEdition from "../../components/pages/days/DaysEdition";
import GlobalEdition from "../../components/pages/global/GlobalEdition";
import MapsEdition from "../../components/pages/maps/MapsEdition";
import ObjectsEdition from "../../components/pages/objects/ObjectsEdition";
import RoomsEdition from "../../components/pages/rooms/RoomsEdition";
import RoomCreation from "../panels/creation/RoomCreation";
import RoomPrompt from "../panels/prompt/RoomPrompt";
import ObjectCreation from "../panels/creation/ObjectCreation";
import ObjectPrompt from "../panels/prompt/ObjectPrompt";

export default function Navigator(){
    return(
        <>
            <Routes>
                <Route path={"/"} element={<GlobalEdition/>}></Route>
                <Route path={"/objects"} element={<ObjectsEdition/>}>
                    <Route index element={<ObjectPrompt/>}/>
                    <Route path="new" element={<ObjectCreation/>}/>
                    <Route path=":id" element={<ObjectPrompt/>}/>
                    <Route path=":id/edit" element={<></>}></Route>
                </Route>
                <Route path={"/rooms"} element={<RoomsEdition/>}>
                    <Route index element={<RoomPrompt/>}/>
                    <Route path="new" element={<RoomCreation/>}/>
                    <Route path=":id" element={<RoomPrompt/>}/>
                </Route>
                <Route path={"/days"} element={<DaysEdition/>}>
                    <Route index element={<div></div>}/>
                    <Route path="new" element={<div></div>}/>
                    <Route path=":id" element={<div/>}/>
                </Route>
                <Route path={"/maps"} element={<MapsEdition/>}>
                    <Route index element={<div/>}/>
                    <Route path="new" element={<div/>}/>
                    <Route path=":id" element={<div/>}/>
                </Route>
            </Routes>
        </>
    );
}