import './MessagesActions.css'
import Reaction from '../../../../Reaction/Reaction'
import AuthProvider from '../../../../../zustand/AuthProvider'
import LikeMessage from '../../../../Reaction/LikeMessage'
import { friendVariant, myMessageVariants } from './variants/variantsReactions'


const MessageActions = ({isMyMessage, message}) => {
    const {userId} = AuthProvider()
    
    const variants = isMyMessage ? myMessageVariants : friendVariant
   
  return (
    <ul className={`MessageActions-container ${isMyMessage ? 'my-message' : 'friend-message'}`}>
      <Reaction
       name="reactionsView-message"
       id={message?._id}
       userId={userId}
       type={'Message'}
       variants={variants}
      >
      <LikeMessage/>
      </Reaction>

       
    </ul>
  )
}

export default MessageActions