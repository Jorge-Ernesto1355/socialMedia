/* eslint-disable no-constant-condition */
import React, { useCallback } from "react";

import "./makeComment.css";
import rem from "../../../../../assets/rem.jpg";
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
import Image from "../../../../../utilities/Image";

const MakeComment = (
  {
    id,
    userforDisplay,
    name,
    userId,
    type,
    componentId,
    showComments,
    hideMakeComments,
    notShowComments
  },
  inputFile,
) => {
  const privateRequest = useUserRequest()
  const { mutate, isLoadingMutation, isError, reset } = useMutationRequest(
    CommentService.comment,
    { id, name },
  );

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
          image: inputFile.current.files[0],
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
  }, [state, inputFile]);


  return (
    <div className="comment-container">
      <div className="photo-makeComment">
      <Image src={rem}
							alt="user"/>
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
            <img src={gallery} alt="gallery emoticon" />
            <input
              type="file"
              ref={inputFile}
              id="fileInput"
              className="input-file-makeComment"
              accept="image/png, image/jpeg, image/jpg, /image.jfif"
            />
            <EmojiPickerWithIcon store={store} set={set} />
            <div
              className="comment-button"
              onClick={() => CommentCallback()}
              disabled={isError}
            >
              {isError && <ErrorButton reset={reset} />}
              {!isError && (
                <>
                  {isLoadingMutation ? <div></div> : <SendButton />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(MakeComment);
