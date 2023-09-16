import React, { useState } from 'react'
import { useCallbackRequest} from '../../../../hooks/useCallbackRequest/useCallbackRequest'
import { objetsImgs } from '../post/objectImg'
import './ReactionsView.css'
import ShowActions from '../showActions/ShowActions'


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

const useReactionsView = ({ id, reqReactionsView, name }) => {
  const { isError, isLoading, data} = useCallbackRequest({ request:reqReactionsView, id, name });
  const [showAllActions, setShowAllActions] = useState(false);

  const reactionsView = data?.data ?? []

  return { isError, isLoading, reactionsView, showAllActions, setShowAllActions };
};
const ReactionsView = ({ id = '', reqReactionsView = ()=>{}, reqReactions = ()=>{}, reqReaction = ()=>{}, name = '', nameView = '' }) => {
  const { isError, isLoading, reactionsView, showAllActions, setShowAllActions } = useReactionsView({ id, reqReactionsView, name:nameView });

  return (
    <div>
      {isError && <div>error</div>}
      {!isLoading && (
        <>
        {reactionsView.length > 0 &&  <ul className={`${name === 'comment' ? 'icons-reactions' : 'container-reactionView'}`}>
          {reactionsView?.map((reactionView) => (
            <li className="img-reactionView" key={`reactionView-key=${reactionView._id}`}>
              <img
                className="icons-reaction"
                src={objetsImgs[reactionView.label]}
                alt={reactionView.label}P
                onClick={() => setShowAllActions(true)}
                />
            </li>
          ))}
        </ul>}
       
          </>
      )}
      {showAllActions && (
        <ShowActions changeShowActions={setShowAllActions} showAction={showAllActions} id={id} reactionsView={reactionsView} name={name} reqReaction={reqReaction} reqReactions={reqReactions}  />
      )}
    </div>
  );
};

export default ReactionsView