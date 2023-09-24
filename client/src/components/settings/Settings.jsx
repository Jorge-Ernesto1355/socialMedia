import React from "react";
import "./Settings.css";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { SettingsRedux } from "../../redux/NavigationRedux";

const Settings = () => {
  const { settings } = useSelector((state) => state.Navigate);
  const dispatch = useDispatch();

  const variantLogin = {
    show: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      y: -500,
      x: 3,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className={`settings ${settings ? "active" : ""}`}>
      <motion.div
        animate={settings ? "show" : "hidden"}
        variants={variantLogin}
        className="card"
      >
        <h3>filtrar post</h3>
        <button onClick={() => dispatch(SettingsRedux())}>eee</button>
        <div className="filters">
          <div className="filter">
            <h5>Filtra imagen</h5> <button>activar</button>
          </div>
          <div className="filter">
            <h5>Filtrar votos</h5> <button>activar</button>
          </div>
          <div className="filter">
            <h5>La mas reciente</h5> <button>activar</button>
          </div>
          <div className="filter">
            <h5>Por texto</h5>
            <div className="input">
              <input type="text" placeholder="filtrar" />
            </div>
          </div>
          <div className="filter">
            <h5>La mas vieja</h5> <button>activar</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
