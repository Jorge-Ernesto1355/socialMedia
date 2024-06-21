import { Button, Col, Flex, Input, Row, message } from 'antd'
import React, { useState } from 'react'
import { reactions } from '../../../Reaction/Reaction'
import { objetsImgs } from '../../post/post/objectImg'
import { useMutation, useQuery } from 'react-query'
import AuthProvider from '../../../../zustand/AuthProvider'
import ConversationService from '../../../RIGHT/Messages/conversationView/services/ConversationService'
import messageService from '../../../RIGHT/Messages/MessageBox/service/MessageService'
import useUserRequest from '../../../../hooks/auth/useUserRequest'

const StoryAction = ({friendId,storyId}) => {
    const {userId} = AuthProvider()

    const [input, setInput] = useState('')

    const privateRequest = useUserRequest()
    const {mutate, isLoading, isError, error} = useMutation({
        mutationKey: ['send-story'], 
        mutationFn: messageService.createMessage, 
        onSuccess: ()=> message.success("Story shared succefully"), 
        onError: ()=> message.error('Someting went wrong')
    })
    

    
    const {data, isLoading: isLoadingConverstion, isError: isErrorConversation, refetch} = useQuery(['getConversationId', userId], ()=> ConversationService.getConversationId({privateRequest, userId, friendId}), {
        enabled: false
    })
    

    const handleMutate = (reactionShared)=>{
        if(!isLoadingConverstion && !isErrorConversation && data){
            mutate({
                privateRequest,
                to: friendId, 
                from: userId, 
                text: input,
                conversationId: data?.data.conversationId, 
                storyId, 
                reactionShared
            })
        }
        refetch()
    }



  return (
    <Row gutter={10} className='story-container-input'>
              <Col span={10}><Input style={{background: "transparent", color: "#ffffff"}} className='story-input' onChange={(e)=> setInput(e.target.value)} placeholder='Comment something to your friend about the story'/></Col>
              <Col span={10}>
                <Flex className='story-container-reactions'>
                        {reactions.map((reaction)=> (
                            <img src={objetsImgs[reaction.label]} onClick={()=> handleMutate(reaction.label)}   key={reaction.label}  alt={reaction.label} className='story-reaction-img'/>
                        ))}  
                </Flex>
              </Col>
              <Col span={2}>
                  <Button loading={isLoading || isLoadingConverstion} danger={isError | isErrorConversation} type='primary' onClick={()=> handleMutate()}>Send</Button>
              </Col>
            </Row>
  )
}

export default StoryAction