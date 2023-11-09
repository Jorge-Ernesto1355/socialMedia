import React from 'react'
import './Conversations.css'
import Conversation from './Conversation/Conversation'

const Conversations = ({conversations = []}) => {
  return (
    <ul className="conversationView-container">

        {conversations?.map((conversation)=> (
            <Conversation key={`conversation-key=${conversation?._id}`} conversation={conversation}/>
        ))}
    </ul>
  )
}

export default Conversations