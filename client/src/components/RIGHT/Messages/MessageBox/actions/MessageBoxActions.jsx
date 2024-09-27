/* eslint-disable no-constant-condition */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './MessageBoxActions.css'
import AuthProvider from '../../../../../zustand/AuthProvider'
import { useSocket } from '../../../../../hooks/useSocket'
import Reply from '../../Message/Reply/Reply'
import BoxMessagesStore from '../../../../../zustand/BoxMessagesStore'
import cross from '../../../../../assets/cross.png'
import { useMutation,  useQueryClient } from 'react-query'
import messageService from '../service/MessageService'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'
import LoaderVote from '../../../../MIDDLE/post/Votes/LoaderVote'
import EmojiPickerComponent from '../../../../EmojiPicker/EmojiPicker'
import { Input, Upload } from 'antd'
import PaperPlaneButton from '../../../../buttons/PaperPlaneButton/PaperPlaneButton'
import ImageIcon from '../../../../MIDDLE/post/comments/icons/ImageIcon'
import SmileIcon from '../../../../MIDDLE/post/comments/icons/SmileIcon'
import { validateFile } from '../../../../MIDDLE/Stories/utils/validateFile'
import { getBase64 } from '../../../../Profile/header/modalProfilePicture/util/getBase64'
import { LoadingOutlined } from '@ant-design/icons'


const MessageBoxActions = ({ conversation}) => {
    const {userId} = AuthProvider()
    const queryClient = useQueryClient()
    const privateRequest = useUserRequest()
    const friendId  = conversation?.participants?.filter((participant)=> participant !==  userId)[0] ?? null
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoadingImageUrl, setIsLoadingImageUrl] = useState(false);
    const file = useRef()
    const {messageReply, deleteMessageReply, checkConversation} = BoxMessagesStore() 
    const socket = useSocket()
    const store = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const messageKey = ['messages', conversation?._id]

    const {mutateAsync, isLoading, isError} = useMutation({
        mutationFn:messageService.createMessage, 
        onMutate: async (message)=>{

                await queryClient.cancelQueries(messageKey)

                const previewsMessages = queryClient.getQueryData(messageKey)

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

        if(input.length <= 0) return 

       const messageData = await mutateAsync({
            to:friendId,
            from:userId, 
            conversationId: conversation?._id, 
            text:input,   
            reply:messageReply,
            privateRequest,
            image: file.current
        })



        

    
        if(!isLoading && !isError){
            const message = messageData?.data ?? null
            setInput("")
            setImageUrl(null)
            file.current = null
            
           if(message !== null)  {
               socket?.emit('new-message', {messageId:message?._id, to:friendId, from:userId})
               const check = checkConversation()
               
            if(!check) socket?.emit('new-unRead-message', {conversationId:conversation?._id, to:friendId, userId})
            }

        }
        
        
    }, [input])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onClick();
        }
    };
    
      
    useEffect(()=>{
        socket?.on('block-conversation', (block)=>{

           
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

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setIsLoadingImageUrl(true);
            return;
        }
    
        if (validateFile(info.file.originFileObj)) {
            getBase64(info.file.originFileObj, (url) => {
                file.current = info.file.originFileObj;
               setIsLoadingImageUrl(false)
                setImageUrl(url);
                file.current = info.file.originFileObj
            });
        }
    };


    const props = {
        className: "comment-img",
        name: 'image',
        onChange:(e)=> handleChange(e),
        showUploadList: false
      };
    

      

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
            {imageUrl && (
                 <div className="image-preview-container">
                     <img src={imageUrl} className='img-preview-message' />
                </div>
            )}
            <div className='messageBox-actions'>
            <div className='MessageBox-actions-form'>
            <Input placeholder='Write something special' onKeyDown={handleKeyDown} value={input} onChange={(e)=> setInput(e.target.value)} ref={store}/>
            </div>
            <div className='MessageBox-actions-InputFile'>
            <Upload {...props}>
              {isLoadingImageUrl ? <LoadingOutlined /> : <ImageIcon/>}
            </Upload>    
            </div>  
            <SmileIcon alt="emoji" onClick={()=> setIsOpen((prev)=> !prev)}  />
            <EmojiPickerComponent className={'absolute'} isOpen={isOpen} setInput={setInput}  />
            <button className='MessageBox-sendButton' onClick={() => onClick()}>
              {isLoading && <LoaderVote/> }
              {!isLoading && (<>
                {!isLoading && !isError && <PaperPlaneButton input={input}/>}
              </>)}
             
            </button>


                
            </div>
                </>
            ) }
        </div>
    )
}

export default MessageBoxActions