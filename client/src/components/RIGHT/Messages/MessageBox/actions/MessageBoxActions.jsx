import React from 'react'
import './MessageBoxActions.css'
import ImgInputFile from '../../../../../stylesComponents/ImgInputFile/ImgInputFile'
import sendButton from '../../icons/paperPlaneBlue.png'
import io from 'socket.io-client'
const socket = io('http://localhost:3002')


const MessageBoxActions = () => {
    const onClick = () => {
        socket.emit('message', { message: 'jorge gupao' })
    }


    return (
        <div className='MessageBox-actions-container'>
            <form className='MessageBox-actions-form'>
                <input type="text" placeholder='Aa' className='MessageBox-actions-input' />
            </form>
            <div className='MessageBox-actions-InputFile'>
                <ImgInputFile />
            </div>
            <button className='MessageBox-sendButton' onClick={() => onClick()}>
                <img src={sendButton} alt="" />
            </button>


        </div>
    )
}

export default MessageBoxActions