import React, { useState } from 'react'
import { objetsImgs } from '../post/objectImg'
import { ConfirmationModal } from '../../../modal/ConfirmationModal'
import ShowActions from '../showActions/ShowActions'

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
      <ConfirmationModal isOpen={isOpen} handleClose={setIsOpen}>
      <ShowActions
          changeShowActions={setIsOpen}
          id={id}
          reactionsView={reactionsView}
          name={name}
          reqReaction={reqReaction}
          reqReactions={reqReactions}
        />
      </ConfirmationModal>

      
    </>
  )
}

export default ReactionView