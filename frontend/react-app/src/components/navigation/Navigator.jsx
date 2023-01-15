import React from "react";
import {Routes, Route, NavLink} from 'react-router-dom';
import RoomCreation from "../panels/creation/RoomCreation";
import RoomPrompt from "../panels/prompt/RoomPrompt";
import ObjectCreation from "../panels/creation/ObjectCreation";
import ObjectPrompt from "../panels/prompt/ObjectPrompt";

export default function Navigator(){
    return(
        <>
            <Routes>
                <Route path={"/"} element={<GlobalEdition/>}></Route>
                <Route path={"/objects"} element={<Selection/>}>
                    <Route index element={<ObjectPrompt/>}/>
                    <Route path="new" element={<ObjectCreation/>}/>
                    <Route path=":id" element={<ObjectPrompt/>}/>
                    <Route path=":id/edit" element={<></>}></Route>
                </Route>
                <Route path={"/rooms"} element={<Selection/>}>
                    <Route index element={<RoomPrompt/>}/>
                    <Route path="new" element={<RoomCreation/>}/>
                    <Route path=":id" element={<RoomPrompt/>}/>
                </Route>
                <Route path={"/days"} element={<Selection/>}>
                    <Route index element={<div></div>}/>
                    <Route path="new" element={<div></div>}/>
                    <Route path=":id" element={<div/>}/>
                </Route>
                <Route path={"/maps"} element={<Selection/>}>
                    <Route index element={<div/>}/>
                    <Route path="new" element={<div/>}/>
                    <Route path=":id" element={<div/>}/>
                </Route>
            </Routes>
        </>
    );
}