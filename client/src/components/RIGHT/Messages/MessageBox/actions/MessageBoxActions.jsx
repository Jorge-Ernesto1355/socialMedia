import React from 'react'
import './MessageBoxActions.css'
import ImgInputFile from '../../../../../stylesComponents/ImgInputFile/ImgInputFile'
import sendButton from '../../icons/paperPlaneBlue.png'

const MessageBoxActions = () => {
    return (
        <div className='MessageBox-actions-container'>
            <form className='MessageBox-actions-form'>
                <input type="text" placeholder='Aa' className='MessageBox-actions-input' />
            </form>
            <div className='MessageBox-actions-InputFile'>
                <ImgInputFile />
            </div>
            <button className='MessageBox-sendButton'>
                <img src={sendButton} alt="" />
            </button>


        </div>
    )
}

export default MessageBoxActions