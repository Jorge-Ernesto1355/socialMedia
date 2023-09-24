import React, { useRef, useState } from "react";
import "./Slider.css";
import montaña from "../../../assets/img.jpg";
import eren from "../../../assets/iconsPost/567918.png";
import amor from "../../../assets/31-2.webp";
import livai from "../../../assets/livai.jpg";
import like from "../../../assets/iconsPost/like.png";
import sip from "../../../assets/sip.png";
import right from "../../../assets/right-arrow.png";
import left from "../../../assets/left-arrow.png";
import cross from "../../../assets/cross.png";
import { motion } from "framer-motion";
const Slider = ({ photos, showPhotos }) => {
  const slideShow = useRef(null);
  const { current: SlideShow } = slideShow;

  const variantsPhotos = {
    visible: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    hidden: {
      scale: 0,
      y: -100,
      transition: {
        duration: 0.2,
      },
    },
  };

  const next = () => {
    if (SlideShow?.children.length > 0) {
      SlideShow.style.transition = `400ms ease-out all`;
      const firstElement = SlideShow?.children[0];

      const SlideSize = SlideShow?.children[0].offsetWidth;

      SlideShow.style.transform = `translateX(-${SlideSize}px)`;

      const transition = () => {
        SlideShow.style.transition = "none";
        SlideShow.style.transform = `translateX(0)`;

        SlideShow.appendChild(firstElement);

        SlideShow.removeEventListener("transitionend", transition);
      };

      SlideShow.addEventListener("transitionend", transition);
    }
  };

  const previous = () => {
    if (SlideShow?.children.length > 0) {
      const index = SlideShow.children.length - 1;
      console.log(index);
      const lastElement = SlideShow.children[index];

      SlideShow.insertBefore(lastElement, SlideShow.firstChild);

      SlideShow.style.transition = "none";
      const SlideSize = SlideShow.children[0].offsetWidth;
      SlideShow.style.transform = `translateX(-${SlideSize}px)`;

      setTimeout(() => {
        SlideShow.style.transition = "300ms ease-out all";
        SlideShow.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  return (
    <motion.div
      variants={variantsPhotos}
      animate={showPhotos ? "visible" : "hidden"}
      className="container-slider "
    >
      <div className="slideShow" ref={slideShow}>
        {photos.length === 0 ? (
          <span className="text-muted margin ">{"no hay fotos ;("}</span>
        ) : (
          <>
            {photos?.map((img) => (
              <div key={img._id} className="slide">
                <img src={img?.image?.url} alt="" />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="controles">
        <button className="button-right" onClick={() => next("right")}>
          <img src={right} alt="" />
        </button>
        <button className="button-left" onClick={() => previous("left")}>
          <img src={left} alt="" />
        </button>
      </div>
    </motion.div>
  );
};

export default Slider;
