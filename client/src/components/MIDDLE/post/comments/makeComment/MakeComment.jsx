/* eslint-disable no-constant-condition */
import React, { useCallback, useRef, useState } from "react";

import "./makeComment.css";
import gallery from "../../../crearPost/icons/gallery.png";

import GetUser from "../../../../../services/GetUser.service";
import useMutationRequest from "../../../../../hooks/useMutationRequest";
import { useQuery } from "react-query";
import AutoComplete from "../../../../Autocomplete/AutoComplete";
import { useStore } from "../../../../../hooks/useStore/useStore";

import EmojiPickerWithIcon from "../../../../EmojiPicker/EmojiPickerWithIcon";
import SendButton from "./styledComponentes/sendButton/SendButton";
import ErrorButton from "./styledComponentes/ErrorButton/ErrorButton";
import CommentService from "../services/CommentServices";
import useUserRequest from "../../../../../hooks/auth/useUserRequest";
import { Avatar, Upload } from "antd";
import {  DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import PaperPlaneButton from "../../../../buttons/PaperPlaneButton/PaperPlaneButton";
import ImgInputFile from "../../../../../stylesComponents/ImgInputFile/ImgInputFile";
import ImageIcon from "../icons/ImageIcon";
import { validateFile } from "../../../Stories/utils/validateFile";
import { getBase64 } from "../../../../Profile/header/modalProfilePicture/util/getBase64";



const MakeComment = (
  {
    id,
    userforDisplay,
    name,
    userId,
    type,
    componentId,
    showComments,
    hideMakeComments = ()=>{},
    notShowComments
  },

) => {


  
  const privateRequest = useUserRequest()
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const file = useRef()

  const { mutate, isLoadingMutation, isError, reset } = useMutationRequest(
    CommentService.comment,
    { id, name },
  );


  const [isOpenEmoji, setIsOpenEmoji] = useState(false)

  const { store, set, get, state } = useStore();

  const { data: userData } = useQuery(
    ["user", userforDisplay],
    () => GetUser(userforDisplay),
    {
      enabled: !!userforDisplay,
    },
  );

  

  const user = userData?.data?.data ?? {};

  const CommentCallback = useCallback(() => {
    if (notShowComments) return
    if (get())
      mutate(
        {
          privateRequest,
          containerId: id,
          userId,
          type,
          text: get(),
          commentId: componentId,
          image: file.current,
        },
        {
          onSuccess: () => {
            showComments && showComments(true);
            hideMakeComments && hideMakeComments(false);
            set("");
            if (store.current) store.current.value = "";
          },
        },
      );
  }, [state, file]);



  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
        setLoading(true);
        return;
    }

    if (validateFile(info.file.originFileObj)) {
        getBase64(info.file.originFileObj, (url) => {
            file.current = info.file.originFileObj;
            setLoading(false);
            setImageUrl(url);
            file.current = info.file.originFileObj
        });
    }
};
  

  const props = {
    className: "comment-img",
    name: 'image',
    onChange:(e)=> handleChange(e),
    showUploadList: false
  };



  return (
    <div className="comment-container">
      <div>
        {imageUrl && <button className="button-delete-upload-img" onClick={()=> setImageUrl(null)}><DeleteOutlined /></button>}
        {imageUrl && <img className="makeComment-upload-img" src={imageUrl}></img>}
      </div>
      <div className="photo-makeComment">
       <Avatar size={45} icon={<UserOutlined />}/>
      </div>
      <div className="field-write-card">
        <div className="field-write">
          {store && (
            <AutoComplete
              placeholder={"Escribe un comentario..."}
              rows={1}
              cols={40}
              ref={store}
              set={set}
              initialText={user?.username}
              stateValue={get}
            />
          )}

          <div className="adjuncts">
            <Upload {...props}>
              <ImageIcon></ImageIcon>
            </Upload>           
            <div >
              <EmojiPickerWithIcon store={store} set={set} setIsOpenEmoji={setIsOpenEmoji}  isOpen={isOpenEmoji} />
            </div>
            <div
              className="comment-button"
              onClick={() => CommentCallback()}
              disabled={isError}
            >
              {isError && <ErrorButton reset={reset} />}
              {!isError && (
                <>
                 <PaperPlaneButton input={get()}></PaperPlaneButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeComment
