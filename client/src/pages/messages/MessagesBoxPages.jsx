import React from 'react'
import './MessageBoxPage.css'
import ReactPortal from '../../components/modal/ReactPortal'
import MessageBox from '../../components/RIGHT/Messages/MessageBox/MessageBox'



const MessageBoxPage = () => {

  return (
    <ReactPortal wrapperId={'Message-box-popup'}>
      <div className='boxMessages-container'>
        <ul className='boxMessages-row'>
          <MessageBox />
        </ul>
      </div>
    </ReactPortal>
  )
}







export default MessageBoxPage