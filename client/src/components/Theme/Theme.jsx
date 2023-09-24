import React from "react";
import "./Theme.css";
import { useDispatch, useSelector } from "react-redux";
import { closeTheme } from "../../redux/NavigationRedux";
import { motion } from "framer-motion";

const Theme = () => {
  const { theme } = useSelector((state) => state.Navigate);
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

  const fontSizes = document.querySelectorAll(".customize-theme span");
  const colorPalette = document.querySelectorAll(".choose-color span");
  const bg1 = document.querySelector(".bg-1");
  const bg2 = document.querySelector(".bg-2");
  const bg3 = document.querySelector(".bg-3");
  const root = document.querySelector(":root");

  // FontSize
  const removeSizeSelector = () => {
    fontSizes.forEach((size) => {
      size.classList.remove("active");
    });
  };

  fontSizes.forEach((size) => {
    size.addEventListener("click", () => {
      removeSizeSelector();
      let fontSize;
      size.classList.toggle("active");

      if (size.classList.contains("font-size-1")) {
        fontSize = "10px";

        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right ", "rem");
      } else if (size.classList.contains("font-size-2")) {
        fontSize = "13px";

        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right ", "rem");
      } else if (size.classList.contains("font-size-3")) {
        fontSize = "16px";
        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right ", "rem");
      } else if (size.classList.contains("font-size-4")) {
        fontSize = "19px";
        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right ", "rem");
      } else if (size.classList.contains("font-size-5")) {
        fontSize = "22px";
        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right ", "rem");
      }

      document.querySelector("html").style.fontSize = fontSize;
    });
  });

  // colorPalette

  colorPalette.forEach((color) => {
    color.addEventListener("click", () => {
      let primaryHue = 0;

      if (color.classList.contains("color-1")) {
        primaryHue = 252;
      } else if (color.classList.contains("color-2")) {
        primaryHue = 52;
      } else if (color.classList.contains("color-3")) {
        primaryHue = 352;
      } else if (color.classList.contains("color-4")) {
        primaryHue = 152;
      } else if (color.classList.contains("color-5")) {
        primaryHue = 202;
      }

      root.style.setProperty("--primary-color-hue", primaryHue);
    });
  });

  // Background

  let lightColorLightnes;
  let whiteColorLightness;
  let darkColorLightness;

  const changeBg = () => {
    root.style.setProperty("--light-color-lightness", lightColorLightnes);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
  };

  const bg2Fu = () => {
    darkColorLightness = "95%";
    whiteColorLightness = "20%";
    lightColorLightnes = "15%";

    bg2.classList.add("active");
    bg1.classList.remove("active");
    bg3.classList.remove("active");
    changeBg();
  };

  const bg3Fu = () => {
    darkColorLightness = "95%";
    whiteColorLightness = "10%";
    lightColorLightnes = "0%";

    bg3.classList.add("active");
    bg1.classList.remove("active");
    bg2.classList.remove("active");
    changeBg();
  };

  const bg1Fu = () => {
    darkColorLightness = "19%";
    whiteColorLightness = "95%";
    lightColorLightnes = "100%";

    bg1.classList.add("active");
    bg3.classList.remove("active");
    bg2.classList.remove("active");
    window.location.reload();
  };

  return (
    <div className={`customize-theme ${theme ? "active" : ""}`}>
      <motion.div
        animate={theme ? "show" : "hidden"}
        variants={variantLogin}
        className="card"
      >
        <h2>costomiza tu vista</h2>
        <p>maneja tu tamaño de letra, color y el fondo </p>
        <button onClick={() => dispatch(closeTheme())}>ddd</button>
        {/* FontSize */}
        <div className="font-size">
          <h4>tamaño de letra</h4>
          <div>
            <h5>Aa</h5>
            <div className="choose-size">
              <span className="font-size-1"></span>
              <span className="font-size-2"></span>
              <span className="font-size-3"></span>
              <span className="font-size-4"></span>
              <span className="font-size-5"></span>
            </div>
            <h3>Aa</h3>
          </div>
        </div>

        {/* Color */}

        <div className="color">
          <h4>Color</h4>
          <div className="choose-color">
            <span className="color-1"></span>
            <span className="color-2"></span>
            <span className="color-3"></span>
            <span className="color-4"></span>
            <span className="color-5"></span>
          </div>
        </div>

        {/* BackGround */}
        <div className="background">
          <h4>Background</h4>
          <div className="choose-bg">
            <div className="bg-1" onClick={() => bg1Fu()}>
              <span></span>
              <h5 htmlFor="bg-1">light</h5>
            </div>
            <div className="bg-2" onClick={() => bg2Fu()}>
              <span></span>
              <h5 htmlFor="bg-2">Dim</h5>
            </div>
            <div className="bg-3" onClick={() => bg3Fu()}>
              <span></span>
              <h5 htmlFor="bg-3">Lights Out</h5>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Theme;
