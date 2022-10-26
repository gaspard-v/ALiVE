import "./creation.css";
import {useRef, useState} from "react";
import React from "react";
import Buttons from "../../buttons/Buttons";
import { TiTick } from "react-icons/ti"
import SegmentedControl from "../../segmented/SegmentedControl";


function ObjectCreation(){

    const [selectedValue1, setSelectedValue1] = useState("complete");
    return(
        <form id="ObjectEditionScreen" className="creation">
            <label className="objectLabel">Nom de l'objet</label>
            <input className="ObjectName"></input>
            <SegmentedControl
                    name="group-1"
                    callback={(val) => setSelectedValue1(val)}
                    controlRef={useRef()}
                    segments={[
                    {
                        label: "Objet",
                        value: "object",
                        ref: useRef()
                    },
                    {
                        label: "Intel",
                        value: "intel",
                        ref: useRef()
                    },
                ]
            }/>
            <label className="descriptionLabel">Description de l'objet</label>
            <input className="ObjectDescription"></input>
            <input className="ObjImg" type="file" name="img" accept="image/*"></input>
            <Buttons icon={<TiTick className="ButtonIcon"/>} type="validate">Valider</Buttons>
            
        </form>
    )

}

export default ObjectCreation;