import React, { Suspense, lazy, useCallback, useState } from "react";
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
import TimeExpiration from "./Difusion/TimeExpiration";
import { HandleStateActions, clearStateActions } from "./HandleSteateOptions";
import useMutationRequest from "../../../hooks/useMutationRequest";
import CreatePostStore from "../../../zustand/CreatePostStore";
import PostServices from "../post/services/PostServices";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import AuthProvider from "../../../zustand/AuthProvider";
import { useQuery } from "react-query";
import userService from "../../../services/UserService";
import SimpleLineLoader from "../../Loaders/SimpleLineLoader";
import { Avatar, Card, Divider, message } from "antd";




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
  const privateRequest = useUserRequest()
  const { votes, timeExpiration, delVotes } = CreatePostStore()
  const [actions, setActions] = useState(ACTIONS_INITIAL_STATE);
  const { userId } = AuthProvider()
 
  const { store, set, get } = useStore();
  const { element, input: inputFile, clearImagePreview } = UseImagePreview()
  const { mutate, isLoadingMutation, isError, reset, } = useMutationRequest(PostServices.create, { name: 'posts' })
  const { data: user, isLoading } = useQuery(["user", userId], () => userService.getUser({ privateRequest, userId }));
  
  const handleMutate = useCallback(() => {
    if (!get()) return
  
    mutate({ description: get(), votes, image: inputFile.current.files[0], privateRequest, userId, timeExpiration}, {
      onSuccess: () => {
        delVotes()
        set("");
        if (store.current) store.current.value = "";
        clearImagePreview()
        clearStateActions()
        message.open({
          type:"success", 
          content: <span>post created succefully  <button style={{marginTop: "10px"}} className="btn-colored">ver post</button></span>
        })
      }
    })

  }, [get()])


  return (
    <div className="container-createPost" aria-disabled={isLoadingMutation} >
      {isLoadingMutation && (
        <BlueLoader><LoaderPost/></BlueLoader>
      )}
      <div className="info-createPost">
      <Avatar src={rem} size={'large'} alt="user"/>
        <div className="info-name">
          {isLoading && <div style={{marginBottom:'.3rem'}}>
          <SimpleLineLoader/>
          </div>}
          {!isLoading && <h5>{user?.username}</h5>}
          <TimeExpiration/>
          
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

        {actions?.poll && (
          <Suspense fallback={<Card loading={true}></Card>}>
            <Votes hideVotes={setActions} />
          </Suspense>
        )}

        {actions?.emoji && (
          <Suspense>
            <EmojiPickerComponent isOpen={actions.emoji} store={store} set={set} />
          </Suspense>
        )}
      </div>
      <img ref={element} onClick={() => clearImagePreview()} />
     <Divider/>
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
        <div style={{ marginTop: '15px' }} onClick={() => handleMutate()} aria-disabled={isError || isLoadingMutation}>
          {isError && <ErrorButton reset={reset} />}
          {!isError && <SendButtonCreatePost />}
        </div>
      </div>
      
    </div>
  );
};

export default CreatePost;
