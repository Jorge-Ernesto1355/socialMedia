import React, { useState } from "react";
import "./feelings.css";

import { motion } from "framer-motion";
import { imgsFeelings } from "./imgsFeelings";
import { PostFeeling } from "../../../../redux/PreviewPostRedux";
import { useDispatch } from "react-redux";

const Feelings = () => {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const handleActive = () => {
    setActive(!active);
  };

  const show = (anything) => {
    dispatch(PostFeeling(anything));
    setValue(anything);
  };
  return (
    <div
      className={`dropdown ${active ? "active" : ""}`}
      onClick={() => handleActive()}
    >
      <img className="show" src={imgsFeelings[value]} alt="" />
      <input
        type="text"
        className="textBox"
        placeholder={`como estas?`}
        readOnly
        value={value}
      />
      <motion.div
        className="option"
        animate={{
          x: 3,
          y: 0,
          scale: 1,
          rotate: 0,
        }}
      >
        <div onClick={() => show("Feliz")}>
          <img src={imgsFeelings["Feliz"]} alt="" />
          Feliz
        </div>
        <div onClick={() => show("Triste")}>
          <img src={imgsFeelings["Triste"]} alt="" />
          Triste
        </div>
        <div onClick={() => show("Enamorado")}>
          <img src={imgsFeelings["Enamorado"]} alt="" />
          Enamorado
        </div>
        <div onClick={() => show("Abrumado")}>
          <img src={imgsFeelings["Abrumado"]} alt="" />
          Abrumado
        </div>
        <div onClick={() => show("Enojado")}>
          <img src={imgsFeelings["Enojado"]} alt="" />
          Enojado
        </div>
      </motion.div>
    </div>
  );
};

export default Feelings;
