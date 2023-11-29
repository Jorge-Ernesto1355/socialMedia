/* eslint-disable no-constant-condition */
import React, { useCallback, useEffect, useState } from 'react'
import './MessageBoxActions.css'
import ImgInputFile from '../../../../../stylesComponents/ImgInputFile/ImgInputFile'
import { useStore } from '../../../../../hooks/useStore/useStore'
import AutoComplete from '../../../../Autocomplete/AutoComplete'
import AuthProvider from '../../../../../zustand/AuthProvider'
import { useSocket } from '../../../../../hooks/useSocket'
import Reply from '../../Message/Reply/Reply'
import BoxMessagesStore from '../../../../../zustand/BoxMessagesStore'
import cross from '../../../../../assets/cross.png'
import { useMutation,  useQueryClient } from 'react-query'
import messageService from '../service/MessageService'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import UseImagePreview from '../../../../../hooks/useImagePreview/useImagePreview'
import LoaderVote from '../../../../MIDDLE/post/Votes/LoaderVote'
import sendBlue from '../../icons/paperPlaneBlue.png'
import sendGray from '../../icons/paperPlaneGray.png'
import agregarPicture from '../../icons/agregar.png'
import EmojiPickerComponent from '../../../../EmojiPicker/EmojiPicker'
import emoji from '../../icons/feliz.png'


const MessageBoxActions = ({ conversation}) => {
    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const friendId  = conversation?.participants?.filter((participant)=> participant !==  userId)[0] ?? null
    const [isOpen, setIsOpen] = useState(false)
    const { store, set, get } = useStore();
    const { element, input: inputFile, clearImagePreview } = UseImagePreview()
    const socket = useSocket()
    const queryClient = useQueryClient()
    const messageKey = ['messages', conversation?._id]
    const {messageReply, deleteMessageReply, checkConversation} = BoxMessagesStore() 
    const {mutateAsync, isLoading, isError} = useMutation({
        mutationFn:messageService.createMessage, 
        onMutate: async (message)=>{

                await queryClient.cancelQueries(messageKey)

                const previewsMessages = queryClient.getQueryData(messageKey,)

                queryClient.setQueryData(messageKey, (newMessage)=>{
              
                    const {privateRequest, ...restMessage} = message
                    const messageToAdd = structuredClone(restMessage)
                    messageToAdd.preview = true
                    const dataDocs = newMessage?.pages[0]?.data?.docs ?? []
                    const newDocs = [...dataDocs, messageToAdd]
                    const {docs, ...restData}  = newMessage.pages[0].data 
                    
                    return {
                        pages: [
                           {
                            data:{
                                docs:newDocs, 
                                ...restData
                            }
                           }
                        ]
                    }
                })

                return {previewsMessages}
        }, 
        onError: (_error, _variables, context)=>{
            if(context?.previewsMessages !== null)
             queryClient.setQueryData(messageKey, context?.previewsMessages)
                
        },
        onSettled:async ()=>{
            await queryClient.invalidateQueries(messageKey)
        }
      
    })
  
    const onClick = useCallback(async () => {

        if(get().length <= 0) return 

       const messageData = await mutateAsync({
            to:friendId,
            from:userId, 
            conversationId: conversation?._id, 
            text:get(),   
            reply:messageReply,
            privateRequest,
            image: inputFile.current.files[0]
        })

    
        if(!isLoading && !isError){
            const message = messageData?.data ?? null
            
           if(message !== null)  {
            socket?.emit('new-message', {messageId:message?._id, to:friendId, from:userId})
            const check = checkConversation()
         
            if(!check) socket?.emit('new-unRead-message', {conversationId:conversation?._id, to:friendId, userId})
           }

        }
        clearImagePreview()
        set('')
    }, [get()])

    useEffect(()=>{
        socket?.on('block-conversation', (block)=>{

            console.log(block)
            queryClient.setQueryData(['conversation', conversation?._id], (existingData) => {
           
                const isBlocked = existingData?.data?.block || false;
        
                const updatedData = {
                  ...existingData,
                  data: {
                    ...existingData.data,
                    block: !isBlocked,
                  },
                };
          
                return updatedData;
              });
        })

        return ()=>{
            socket.off('block-conversation')
        }
    }, [])





    return (
        <div className='MessageBox-actions-container'>
            
            {conversation?.block ? (
                <>
                    <div className='conversation-blocked-container'>
                        <p className='conversation-blocked-text'>Sorry, this conversation has been blocked</p>
                    </div>
                </>
            ) : (
                <>
                 {!!messageReply && (
                <div className='actions-reply-container'>
            
                <Reply messageId={messageReply}/>
                <img onClick={deleteMessageReply} className='actions-reply-cross' src={cross} alt="eliminar" />
             </div>
             ) } 
             <div className="actions-img-send">
				<img ref={element} onClick={() => clearImagePreview()} />
			</div>
            <div className='messageBox-actions'>
            <div className='MessageBox-actions-form'>
            {store && (
            <AutoComplete
              placeholder={"Aa"}
              rows={1}
              cols={25}
              ref={store}
              set={set}
              stateValue={get}
            />
          )} 
            </div>
            <div className='MessageBox-actions-InputFile'>
            <ImgInputFile ref={inputFile} img={agregarPicture} />
            </div>  
            <img src={emoji} className='MessageBox-emoji' alt="emoji" onClick={()=> setIsOpen((prev)=> !prev)} />
            <EmojiPickerComponent className={'absolute'} isOpen={isOpen} store={store} set={set}  />
            <button className='MessageBox-sendButton' onClick={() => onClick()}>
              {isLoading && <LoaderVote/> }
              {!isLoading && (<>
                {!isLoading && !isError && get()?.length ?  <img src={sendBlue} className='Messagebox-sendbutton'/> :  <img src={sendGray} className='Messagebox-sendbutton'/>}
              </>)}
             
            </button>


                
            </div>
                </>
            ) }
        </div>
    )
}

export default MessageBoxActions