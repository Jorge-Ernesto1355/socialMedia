import React, { lazy, useCallback, useState } from "react";
import "./CreatePost.css";
import rem from "../../../assets/rem.jpg";
import poll from "./icons/poll.png";
import schedule from "./icons/calendar.png";
import smile from "./icons/smile.png";
import AutoComplete from "../../Autocomplete/AutoComplete";
import { useStore } from "../../../hooks/useStore/useStore";
import UseImagePreview from "../../../hooks/useImagePreview/useImagePreview";
import ImgInputFile from "../../../stylesComponents/ImgInputFile/ImgInputFile";

import ErrorButton from "../post/comments/makeComment/styledComponentes/ErrorButton/ErrorButton";
import SendButtonCreatePost from "./senbButtonCreatePost/SendButtonCreatePost";
import BlueLoader from "../../../stylesComponents/BlurLoader/BlueLoader";
import LoaderPost from "../../../stylesComponents/LoaderPost/LoaderPost";
import Difusion from "./Difusion/Difusion";
import { HandleStateActions, clearStateActions } from "./HandleSteateOptions";
import useMutationRequest from "../../../hooks/useMutationRequest";
import CreatePostStore from "../../../zustand/CreatePostStore";
import CreatePostService from "../../../services/CreatePost.service";

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

  const { votes, difusion, delVotes } = CreatePostStore()
  const [actions, setActions] = useState(ACTIONS_INITIAL_STATE);
  const { store, set, get, state } = useStore();
  const { element, input: inputFile, clearImagePreview } = UseImagePreview()
  const { mutate, isLoading, isError, reset } = useMutationRequest(CreatePostService, { name: 'posts' })

  const handleMutate = useCallback(() => {
    if (!get()) return
    mutate({ description: get(), votes, image: inputFile.current.files[0], difusion }, {
      onSuccess: () => {
        delVotes()
        set("");
        if (store.current) store.current.value = "";
        clearImagePreview()
        clearStateActions()
      }
    })

  }, [])







  return (
    <div className="container-createPost">
      {isLoading && (
        <BlueLoader><LoaderPost /></BlueLoader>
      )}
      <div className="info-createPost">
        <div className="profile-photo">
          <img src={rem} alt="" />
        </div>
        <div className="info-name">
          <h3>{''}</h3>
          <Difusion />
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
            onClick={() => HandleStateActions("poll", actions, setActions)}
            alt=""
          />
          <img
            className="options-createPost-icon"
            src={smile}
            onClick={() => HandleStateActions("emoji", actions, setActions)}
            alt=""
          />
          <img
            style={{ width: '35px', height: '35px' }}
            className="options-createPost-icon"
            src={schedule}
            onClick={() => HandleStateActions("shedule", actions, setActions)}
            alt=""
          />
        </div>
        <div style={{ marginTop: '15px' }} onClick={() => handleMutate()} aria-disabled={isError || isLoading}>
          {isError && <ErrorButton reset={reset} />}
          {!isError && <SendButtonCreatePost />}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
