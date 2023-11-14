import React, { useCallback } from 'react'
import './MessageBoxActions.css'
import ImgInputFile from '../../../../../stylesComponents/ImgInputFile/ImgInputFile'
import sendButton from '../../icons/paperPlaneBlue.png'
import { useStore } from '../../../../../hooks/useStore/useStore'
import AutoComplete from '../../../../Autocomplete/AutoComplete'
import AuthProvider from '../../../../../zustand/AuthProvider'
import { useSocket } from '../../../../../hooks/useSocket'



const MessageBoxActions = ({friendId, conversation}) => {
    const {userId} = AuthProvider()
    const { store, set, get } = useStore();
    const socket = useSocket()


    const onClick = useCallback(() => {

        if(get().length <= 0) return 
        
        socket?.emit('new-message', {to:friendId, from:userId, conversationId:conversation?._id, message:get()})
    }, [get()])


    return (
        <div className='MessageBox-actions-container'>
            <form className='MessageBox-actions-form'>
            {store && (
            <AutoComplete
              placeholder={"Escribe un comentario..."}
              rows={1}
              cols={28}
              ref={store}
              set={set}
              stateValue={get}
            />
          )} 
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