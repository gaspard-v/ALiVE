import "./creation.scss";
import { useRef, useState } from "react";
import React from "react";
import Buttons from "../../buttons/Buttons";
import { TiTick } from "react-icons/ti";
import SegmentedControl from "../../segmented/SegmentedControl";
import { createObject } from "../../../api/object/ObjectCall";

function ObjectCreation() {
  const [selectedValue1, setSelectedValue1] = useState("complete");
  // const [form, setFormValue] = useState();
  const [objectName, setObjectName] = useState("");
  const [objectDescription, setObjectDescription] = useState("");
  const [objectImg, setObjectImg] = useState("");
  const segmentedControl = useRef(null);

  function onSubmit(event) {
    event.preventDefault();
    const response = {
      name: objectName,
      description: objectDescription,
      isTool: 1,
    };
    createObject(response);
  }

  return (
    <form
      className="EditionScreen"
      id="ObjectCreationScreen"
      onSubmit={onSubmit}
    >
      <label className="NameLabel">Nom de l'objet</label>
      <input
        className="ModelName"
        value={objectName}
        onChange={(e) => setObjectName(e.target.value)}
      ></input>
      <SegmentedControl
        name="group-1"
        callback={(val) => setSelectedValue1(val)}
        controlRef={useRef()}
        segments={[
          {
            label: "Objet",
            value: "object",
            ref: useRef(),
          },
          {
            label: "Intel",
            value: "intel",
            ref: useRef(),
          },
        ]}
      />
      <label className="DescriptionLabel">Description de l'objet</label>
      <textarea
        className="Description"
        value={objectDescription}
        onChange={(e) => setObjectDescription(e.target.value)}
      ></textarea>
      <input
        className="ObjImg"
        type="file"
        name="img"
        accept="image/*"
        value={objectImg}
        onChange={(e) => setObjectImg(e.target.value)}
      ></input>
      <Buttons
        icon={<TiTick className="ButtonIcon" />}
        color="validate"
        to="../1"
        type="submit"
      >
        Valider
      </Buttons>
    </form>
  );
}

export default ObjectCreation;
