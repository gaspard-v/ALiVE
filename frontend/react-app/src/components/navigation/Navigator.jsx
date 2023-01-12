import React from "react";
import {Routes, Route, NavLink} from 'react-router-dom';
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
<<<<<<< HEAD
                <Route path={"/objects"} element={<Selection/>}>
=======
                <Route path={"/objects"} element={<ObjectsEdition/>}>
>>>>>>> ad70c80 (Object creation refacto)
                    <Route index element={<ObjectPrompt/>}/>
                    <Route path="new" element={<ObjectCreation/>}/>
                    <Route path=":id" element={<ObjectPrompt/>}/>
                    <Route path=":id/edit" element={<></>}></Route>
                </Route>
<<<<<<< HEAD
                <Route path={"/rooms"} element={<Selection/>}>
=======
                <Route path={"/rooms"} element={<RoomsEdition/>}>
>>>>>>> ad70c80 (Object creation refacto)
                    <Route index element={<RoomPrompt/>}/>
                    <Route path="new" element={<RoomCreation/>}/>
                    <Route path=":id" element={<RoomPrompt/>}/>
                </Route>
<<<<<<< HEAD
                <Route path={"/days"} element={<Selection/>}>
=======
                <Route path={"/days"} element={<DaysEdition/>}>
>>>>>>> ad70c80 (Object creation refacto)
                    <Route index element={<div></div>}/>
                    <Route path="new" element={<div></div>}/>
                    <Route path=":id" element={<div/>}/>
                </Route>
<<<<<<< HEAD
                <Route path={"/maps"} element={<Selection/>}>
=======
                <Route path={"/maps"} element={<MapsEdition/>}>
>>>>>>> ad70c80 (Object creation refacto)
                    <Route index element={<div/>}/>
                    <Route path="new" element={<div/>}/>
                    <Route path=":id" element={<div/>}/>
                </Route>
            </Routes>
        </>
    );
}