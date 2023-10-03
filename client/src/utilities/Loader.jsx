import React from "react";

const Loader = ({ box }) => {
  return (
    <div className={`autocomplete-loading ${box && box}`}>
      <svg
        className="autocomplete-loading-icon"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeDasharray="164.93361431346415 56.97787143782138"
          strokeWidth="6"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            keyTimes="0;0.40;0.65;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;90 50 50;180 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
