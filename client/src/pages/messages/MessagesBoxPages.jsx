import React from 'react'
import BoxMessage from '../../components/RIGHT/messages/boxMessage/BoxMessage'
import './MessageBoxPage.css'
import ReactPortal from '../../components/modal/ReactPortal'

const MessageBoxPage = () => {
  return (
    <div className='boxMessages-container'>
        <ul className='boxMessages-row'>
            <BoxMessage/>
        </ul>
        
    </div>
  )
}


const MessageBoxPagePortal = ()=>{
  return (
    <ReactPortal wrapperId={'Message-box-page'} closeModal={handleClose}>
        <MessageBoxPage/>
    </ReactPortal>
  )
}





export default 