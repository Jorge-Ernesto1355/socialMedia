import React from 'react'
import './messengerPopover.css'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from '../../../utilities/Image'
import messengerBlack from './messenger-black.png'
import { IoIosExpand } from "react-icons/io";
import { Badge, Popover } from 'antd'
import WithSearch from '../../../HOCs/WithSearch'
import ConversationView from '../../RIGHT/Messages/conversationView/ConversationView.jsx';
import { Link } from 'react-router-dom';
import AuthProvider from '../../../zustand/AuthProvider.js';

const MessengerIcon = () => {

  const {userId} = AuthProvider()
  const ConversationViewWithSearch = WithSearch(ConversationView, {INDEX_NAME:'conversations'})
  


  const content =  (
    
      <ul className='messengerPopover-container'>
            <div className='messengerPopover-header'>
              <h3>Chats</h3>
              <div className='messengerPopover-options'>
                <div className='icon-circle'>
                <IoIosExpand size={"1rem"}/>
                </div>
                <div className='icon-circle'>
                <HiOutlineDotsHorizontal size={"1rem"}/>
                </div>
                
              </div>
            </div>
            <ConversationViewWithSearch title=""/>

        </ul>
    
  )
  return (
    <>
    <Link to={`conversations/${userId}`}>
      <Popover trigger={"click"} content={content} >
          <Badge count={0} offset={[-12,35 ]} size="small">
              <div className='icon-navbar'>
              <Image src={messengerBlack}/>
          </div>
            </Badge>

          </Popover>
    </Link>
        
    </>
  )
}

export default MessengerIcon