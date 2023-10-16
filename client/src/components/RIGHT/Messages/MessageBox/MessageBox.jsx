import React from 'react'
import './MessageBox.css'
import MessageBoxHeader from './header/MessageBoxHeader'
import MessageBoxBody from './body/MessageBoxBody'
import MessageBoxActions from './actions/MessageBoxActions'
const MessageBox = () => {
    return (
        <div className='MessageBox-container'>
            <MessageBoxHeader />
            <MessageBoxBody />
            <MessageBoxActions />
        </div>
    )
}

export default MessageBox