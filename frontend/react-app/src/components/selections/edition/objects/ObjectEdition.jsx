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
            <h1 className="ObjectName">Nom d'objet</h1>
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
            <p className="ObjectDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet, purus a auctor ultrices, ligula turpis consectetur eros, id rhoncus ante sapien eu elit. Donec facilisis fermentum diam quis faucibus. Duis finibus pellentesque justo a sagittis. Phasellus sed diam sagittis, blandit metus vel, hendrerit mi. Proin luctus gravida posuere. Donec eu dui est. Donec sit amet mi non erat scelerisque finibus nec maximus velit. Maecenas sagittis libero nec lacus euismod, ut vehicula mauris aliquam. Cras molestie consectetur eros sed eleifend. Morbi id ex eu odio vulputate porta. Phasellus ornare lobortis varius. Aliquam dapibus purus a pretium ullamcorper. Duis pellentesque pulvinar sapien. Praesent fringilla et justo non fermentum.

</p>
            <img className="ObjImg" alt="Obj img"></img>
            <Buttons icon={<TiPencil className="ButtonIcon"/>} type="modify">Modifier</Buttons>
            <Buttons icon={<RiDeleteBin2Line className="ButtonIcon"/>} type="delete">Supprimer</Buttons>
            
        </div>
    )

}

export default ObjectsEdition;