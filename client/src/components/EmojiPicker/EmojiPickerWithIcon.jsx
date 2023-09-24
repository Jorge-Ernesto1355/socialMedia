import React, { lazy, useState } from "react";
import smile from "../MIDDLE/crearPost/icons/smile.png";

const EmojiPickerComponent = lazy(() => import("./EmojiPicker"));

const EmojiPickerWithIcon = ({ store, set }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {store && set && (
        <EmojiPickerComponent
          isOpen={isOpen}
          store={store}
          set={set}
          className={"absolute"}
        />
      )}

      <img
        src={smile}
        alt="smile emoticon"
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </div>
  );
};

export default EmojiPickerWithIcon;
