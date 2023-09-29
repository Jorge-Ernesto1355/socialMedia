import React, { Suspense, lazy, useState } from 'react'
import { objetsImgs } from '../post/objectImg'
import ShowActions from '../showActions/ShowActions'
const ConfirmationModal = lazy(()=> import('../../../modal/ConfirmationModal'))
const ReactionView = ({reactionView, name, id, reactionsView, reqReaction, reqReactions}) => {
     const [isOpen, setIsOpen] = useState(false)
     
  return (
    <>
    <li
      onClick={()=> setIsOpen((prev)=> !prev)}
      className="img-reactionView"
      key={`reactionView-key=${reactionView._id}`}
        >
        <img
        className="icons-reaction"
        src={objetsImgs[reactionView.label]}
        alt={reactionView.label}
        />
      </li>
      {isOpen && (
      <Suspense>
         <ConfirmationModal isOpen={isOpen} handleClose={setIsOpen} >
           <ShowActions
            changeShowActions={setIsOpen}
            id={id}
            reactionsView={reactionsView}
            name={name}
            reqReaction={reqReaction}
            reqReactions={reqReactions}
         />
        </ConfirmationModal>
    </Suspense>
  )}</>
  )
}

export default ReactionView