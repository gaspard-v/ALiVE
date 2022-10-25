import "./objects.css";
import {useRef, useState} from "react";
import React from "react";
import Buttons from "../buttons/Buttons";
import { TiPencil } from "react-icons/ti"
import { RiDeleteBin2Line } from "react-icons/ri"
import SegmentedControl from "../segmented/SegmentedControl";


function ObjectsEdition(){

    const [selectedValue1, setSelectedValue1] = useState("complete");
    return(
        <div id="ObjectEditionScreen">
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
            <Buttons icon={<TiPencil className="ButtonIcon"/>} type="modify">Modifier</Buttons>
            <Buttons icon={<RiDeleteBin2Line className="ButtonIcon"/>} type="delete">Supprimer</Buttons>
            
        </div>
    )

}

export default ObjectsEdition;