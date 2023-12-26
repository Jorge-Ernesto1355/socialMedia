import "./EmojiPicker.css";
import EmojiPicker from "emoji-picker-react";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Loader from "../../utilities/Loader";

const variants = {
  show: {
    opacity: 1,
    scale: 1,
    duration: {},
  },
  hide: {
    opacity: 0,
    scale: 0,
  },
};
 function EmojiPickerComponent({
  isOpen,
  store,
  set,
  className,
}) {
  const onClickEmojis = (event) => {
    const { unified } = event;
    if (!store.current) return;
    store.current.focus();
    const sym = unified.split("-");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);

    const start = store.current.value.substr(0, store.current.selectionStart);
    const end = store.current.value.substr(store.current.selectionStart);
    const text = start + emoji + end;
    set && set(text);
  };

  return (
    <>
      {isOpen && (
        <Suspense fallback={<Loader />}>
          <motion.div
            variants={variants}
            animate={`${isOpen ? "show" : "hide"}`}
            className={`EmojiPickerReact ${className ?? ''} `}
          >
            <EmojiPicker onEmojiClick={onClickEmojis} />
          </motion.div>
        </Suspense>
      )}
    </>
  );
}

export default React.memo(EmojiPickerComponent)
