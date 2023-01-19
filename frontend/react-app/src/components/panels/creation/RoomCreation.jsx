import React, { useRef, useState } from "react";
import Buttons from "../../buttons/Buttons";
import { TiTick } from "react-icons/ti";
import "./creation.scss";
import {createRoom} from "../../../api/room/RoomCall";

export default function RoomCreation() {
  // const [form, setFormValue] = useState();
  const [roomName, setRoomName] = useState("");
  const [roomImg, setRoomImg] = useState("");
  const segmentedControl = useRef(null);

  function onSubmit(event) {
    event.preventDefault();
    const response = {
      name: roomName,
      img: roomImg
    };
    createRoom(response);
  }

  return (
    <form id="RoomMapCreationScreen" className="EditionScreen" onSubmit={onSubmit}>
      <label className="NameLabel">Nom de pièce</label>
      <input
        className="ModelName"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        className="RoomMapImg"
        type="file"
        name="img"
        accept="image/*"
        value={roomImg}
        onChange={(e) => setRoomImg(e.target.value)}
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
