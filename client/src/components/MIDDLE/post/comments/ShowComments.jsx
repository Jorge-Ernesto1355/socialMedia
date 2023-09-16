import React, { useReducer, useState } from 'react'
import Comments from './Comments'
import { getAllCommentsResponded } from '../services/actions/actions'

const classNames = {
  commentsResponded: 'comments-responded',
  watchCommentsResponded: 'watchCommentsResponded'
};

const initialState = false;

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMMENTS_RESPONDED':
      return !state;
    default:
      return state;
  }
};





const ShowCommentsResponded = ({ respondedLength = 0, commentId = ''}) => {
    
    const [showCommentsResponded, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
        {showCommentsResponded ? (
        <Comments id={commentId} request={getAllCommentsResponded} name={'commentsResponded'} className={classNames.commentsResponded}  />
       ) : (
         <>
           {respondedLength > 0 && (
             <div
               className="watchCommentsResponded"
               onClick={() => dispatch({ type: 'TOGGLE_SHOW_COMMENTS_RESPONDED' })}
             >
               <span>
                 {respondedLength} comentarios
               </span>
             </div>
           ) }
         </>
       )}</div>
  )
}

export default ShowCommentsResponded