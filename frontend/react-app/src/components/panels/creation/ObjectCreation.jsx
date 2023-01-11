import "./creation.scss";
import {useRef, useState} from "react";
import React from "react";
import Buttons from "../../buttons/Buttons";
import { TiTick } from "react-icons/ti"
import SegmentedControl from "../../../../segmented/SegmentedControl";
import { FiUpload } from "react-icons/fi"
import createObject from "../../../api/object/ObjectCall";


function ObjectCreation(){

    const [selectedValue1, setSelectedValue1] = useState("complete");
    // const [form, setFormValue] = useState();
    const [objectName,setObjectName] = useState("");
    const [objectDescription,setObjectDescription] = useState("");
    const [objectImg,setObjectImg] = useState("");
    const segmentedControl = useRef(null)

    function onSubmit(event){
        event.preventDefault();
        const response = {name:objectName,
                        description:objectDescription,
                        isTool:1}
        createObject(response);
    }

    return(
        <form id="ObjectEditionScreen" className="creation" onSubmit={onSubmit}>
            <label className="objectLabel">Nom de l'objet</label>
            <input className="ObjectName" value={objectName} onChange={e => setObjectName(e.target.value)}></input>
            <SegmentedControl
                    name="group-1"
                    callback={(val) => setSelectedValue1(val)}
                    controlRef={segmentedControl}
                    segments={[
                    {
                        label: "Objet",
                        value: "object",
                      
                    },
                    {
                        label: "Intel",
                        value: "intel",
                      
                    },
                ]
            }/>
            <label className="descriptionLabel">Description de l'objet</label>
            <input className="ObjectDescription" value={objectDescription} onChange={e => setObjectDescription(e.target.value)}></input>
            <input className="ObjImg" type="file" name="img" accept="image/*" value={objectImg} onChange={e => setObjectImg(e.target.value)}></input>
            <Buttons icon={<TiTick className="ButtonIcon"/>} color="validate" to="../1" type="submit">Valider</Buttons>
        </form>
    )
    }

export default ObjectCreation;