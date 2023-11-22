import React from "react";
import { useCallbackRequest } from "../../../hooks/useCallbackRequest/useCallbackRequest";
import "./ReactionsView.css";
import ReactionView from "./ReactionView";
import ReactionService from "../services/ReactionService";
import useUserRequest from "../../../hooks/auth/useUserRequest";

/**
 * React component that displays a list of reaction icons based on the data received from the `CallbackRequest` function.
 * It also has a button that triggers the display of additional actions related to the selected reaction.
 *
 * @component
 * @example
 * <ReactionsView id={1} reqReactionsView={reqReactionsView} reqReactions={reqReactions} name="comment" />
 *
 * @param {number} id - The ID of the item for which the reactions are being viewed.
 * @param {function} reqReactionsView - A function that retrieves the reactions view data.
 * @param {function} reqReactions - A function that retrieves the reactions data.
 * @param {string} name - The name of the item for which the reactions are being viewed.
 * @returns {JSX.Element} - The React component.
 */

const useReactionsView = ({ id, name, privateRequest, type}) => {
  const { isError, isLoading, data } = useCallbackRequest({
    request: ReactionService.reactionView,
    id,
    name,
    privateRequest,
    type
  });
 
 
  const reactionsView = data?.data?.reactionsView ?? [];
  const totalDocs = data?.data?.totalDocs ?? 0

  return {
    isError,
    isLoading,
    reactionsView,
    totalDocs
  };
};
const ReactionsView = ({
  id = "",
  name = "",
  nameView = "",
  type = '',
  className = ''
}) => {
  const privateRequest = useUserRequest()

  const {
    isError,
    isLoading,
    reactionsView,
    totalDocs
  } = useReactionsView({ id, name: nameView , privateRequest, type });



  return (
    <div>
      {isError && null}
      {!isLoading && (
        <>
          {reactionsView.length > 0 && (
            <ul
              className={`${className ? className : ''}`}
            >
              {reactionsView?.map((reactionView) => (
                <ReactionView
                 name={name}
                 id={id}
                 reactionView={reactionView}
                 reactionsView={reactionsView}
                 type={type}
                 key={reactionView._id}/>
              ))}
              <span className="lenght-reactions">{totalDocs}</span>
            </ul>
          )}
        </>
      )}
      
    </div>
  );
};

export default ReactionsView;
