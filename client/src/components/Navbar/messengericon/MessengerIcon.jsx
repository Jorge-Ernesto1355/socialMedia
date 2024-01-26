import React from 'react'
import './messengerPopover.css'
import Image from '../../../utilities/Image'
import messengerBlack from './messenger-black.png'
import { IoIosExpand } from "react-icons/io";
import { Badge, Popover } from 'antd'
import WithSearch from '../../../HOCs/WithSearch'
import ConversationView from '../../RIGHT/messages/conversationView/ConversationView'
const MessengerIcon = () => {

  const ConversationViewWithSearch = WithSearch(ConversationView, {INDEX_NAME:'conversations'})
  


  const content =  (
    
      <ul className='messengerPopover-container'>
            <div className='messengerPopover-header'>
              <h3>Chats</h3>
              <div className='messengerPopover-options'>
                <IoIosExpand/>
              </div>
            </div>
            <ConversationViewWithSearch title=""/>

        </ul>
    
  )
  return (
    <>

        <Popover trigger={"click"} content={content} >
        <Badge count={0} offset={[-12,35 ]} size="small">
             <div className='icon-navbar'>
            <Image src={messengerBlack}/>
        </div>
          </Badge>

        </Popover>
    </>
  )
}

export default MessengerIcon