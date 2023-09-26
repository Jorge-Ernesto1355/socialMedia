import React, { lazy, useEffect, useState } from "react";
import "./CreatePost.css";
import { useSelector } from "react-redux";
import rem from "../../../assets/rem.jpg";
import down from "./icons/down.png";
import gallery from "./icons/gallery.png";
import poll from "./icons/poll.png";
import schedule from "./icons/calendar.png";
import smile from "./icons/smile.png";
import AutoComplete from "../../Autocomplete/AutoComplete";
import { useStore } from "../../../hooks/useStore/useStore";
import UseImagePreview from "../../../hooks/useImagePreview/useImagePreview";
import ImgInputFile from "../../../stylesComponents/Loading/ImgInputFile/ImgInputFile";

const Votes = lazy(() => import("./Vote/Votes"));

const EmojiPickerComponent = lazy(() =>
  import("../../EmojiPicker/EmojiPicker"),
);

const ACTIONS_INITIAL_STATE = {
  poll: false,
  emoji: false,
  schedule: false,
};

const CreatePost = () => {
  const { user } = useSelector((state) => state.user.currentUser);
  const [actions, setActions] = useState(ACTIONS_INITIAL_STATE);
  const { store, set, get } = useStore();
  const { element, input: inputFile, clearImagePreview } = UseImagePreview()


  const handleClick = (key) => {
    // Crear una copia del estado actual
    const updatedActions = { ...actions };

    // Establecer el valor del key proporcionado en true
    updatedActions[key] = true;

    // Establecer los otros valores en false
    for (const actionKey in updatedActions) {
      if (actionKey !== key) {
        updatedActions[actionKey] = false;
      }
    }
    // Actualizar el estado con el nuevo objeto de acciones
    setActions(updatedActions);
  };

  return (
    <div className="container-createPost">
      <div className="info-createPost">
        <div className="profile-photo">
          <img src={rem} alt="" />
        </div>
        <div className="info-name">
          <h2>{user.username}</h2>
          <div className="post-everyone">
            <span>everyone</span>
            <img src={down} alt="" />
          </div>
        </div>
      </div>
      <div className="input-createPost">
        {store && (
          <AutoComplete
            placeholder={"Escribe algo..."}
            rows={2}
            cols={38}
            ref={store}
            set={set}
            stateValue={get}
            larger={'larger'}
          />
        )}
        <Votes VotesActive={actions.poll} hideVotes={setActions} />
        <EmojiPickerComponent isOpen={actions.emoji} store={store} set={set} />
      </div>
      <img ref={element} onClick={() => clearImagePreview()} />
      <div className="divisor"></div>
      <div className="down-createPost">
        <div className="options-createPost">
          <ImgInputFile ref={inputFile} />
          <img
            className="options-createPost-icon"
            src={poll}
            onClick={() => handleClick("poll")}
            alt=""
          />
          <img
            className="options-createPost-icon"
            src={smile}
            onClick={() => handleClick("emoji")}
            alt=""
          />
          <img
            className="options-createPost-icon"
            src={schedule}
            onClick={() => handleClick("schedule")}
            alt=""
          />
        </div>
        <div>
          <button className="button-post-createPost">post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
