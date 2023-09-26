/* eslint-disable no-constant-condition */
import React, { useCallback, useMemo } from "react";

import "./makeComment.css";
import rem from "../../../../../assets/rem.jpg";
import gallery from "../../../crearPost/icons/gallery.png";

import GetUser from "../../../../../services/GetUser.service";
import useMutationRequest from "../../../../../hooks/useMutationRequest";
import paperPlaneBlue from "../icons/paperPlaneBlue.png";
import paperPlaneGray from "../icons/paperPlaneGray.png";
import { useQuery } from "react-query";
import AutoComplete from "../../../../Autocomplete/AutoComplete";
import { useStore } from "../../../../../hooks/useStore/useStore";
import { ThreeDotsLoader } from "./ThreeDotsLoader";
import EmojiPickerWithIcon from "../../../../EmojiPicker/EmojiPickerWithIcon";
import warning from "../icons/warning.png";
import { isDefined } from "../../../../../utilities/isDefined";
import SendButton from "./styledComponentes/sendButton/SendButton";
import ErrorButton from "./styledComponentes/ErrorButton/ErrorButton";

const MakeComment = (
  {
    id,
    userforDisplay,
    name,
    userId,
    request,
    componentId,
    showComments,
    hideMakeComments,

  },
  inputFile,
) => {
  const { mutate, isLoadingMutation, isError, reset } = useMutationRequest(
    request,
    { id, name },
  );

  const { store, set, get, state } = useStore();


  const { data: userData } = useQuery(
    ["user", userforDisplay],
    () => GetUser(userforDisplay),
    {
      enabled: isDefined(userforDisplay),
    },
  );

  const user = userData?.data?.data ?? {};

  const CommentCallback = useCallback(() => {
    if (!request) return;
    if (state)
      mutate(
        {
          postId: id,
          userId,
          text: state,
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
        <img src={rem} alt="" />
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
              username={user?.username}
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
              {isError && <ErrorButton reset={reset}/>}
              {!isError && (
                <>
                {isLoadingMutation ? <ThreeDotsLoader/>  : <SendButton/>}
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
