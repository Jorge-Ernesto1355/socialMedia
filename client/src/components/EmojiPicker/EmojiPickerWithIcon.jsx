import React, { Suspense, lazy} from "react";
import smile from "../MIDDLE/crearPost/icons/smile.png";

import SmileIcon from "../MIDDLE/post/comments/icons/SmileIcon";
import SpinnerLoader from "../../stylesComponents/spinnerLoader/SpinnerLoader";

const EmojiPickerComponent = lazy(() => import("./EmojiPicker"));

const EmojiPickerWithIcon = ({ store, set, isOpen, setIsOpenEmoji }) => {
  

  return (
    <div  >
     <div style={{ position: "absolute", top: "-100px", left: "55%"  }}>
     {isOpen && (
        <Suspense fallback={<SpinnerLoader center></SpinnerLoader>}>
        {store && set && (
          <EmojiPickerComponent
            isOpen={isOpen}
            store={store}
            set={set}
            className={"absolute"}
          />
        )}
      </Suspense>
      )}
     </div>

        <div onClick={()=> setIsOpenEmoji((prev)=> !prev)}>
              <SmileIcon />
        </div>
    </div>
  );
};

export default EmojiPickerWithIcon;
