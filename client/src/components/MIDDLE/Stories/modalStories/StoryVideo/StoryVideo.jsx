import React, { useState } from 'react'
import { Button, Col, Divider, Flex, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import AuthProvider from '../../../../../zustand/AuthProvider'
import VideoInput from './VideoInput'
import { useMutation } from 'react-query'
import { storyService } from '../../services/storyService'
import useUserRequest from '../../../../../hooks/auth/useUserRequest'

const StoryVideo = ({closeModal, expiresIn = 86400}) => {

  const {userId} = AuthProvider()
  const [input, setInput] = useState("")
  const [file, setFile] = useState("")
  const privateRequest = useUserRequest()


  const {mutate, isLoading, isError} = useMutation({
    mutationFn: storyService.createStoryPhoto, 
      mutationKey: ['story-creation', userId], 
      onSuccess: ()=> {
        message.success("story created succefully")
        closeModal()
      }, 
      onError: ()=> message.error("Something went wrong, try again later")
    })


    const handleMutate = ()=>{    
      
      if(!file) return 
      mutate({
         privateRequest, 
          story: {
            text: input,
            media: file,
            expiresIn: expiresIn, 
          }, 
          userId
        })
      
      }
  
  

  return (
<>
    <Divider/>  
    <Row gutter={40} >
       
       <Col xs={24} span={12} md={10} >
          <Flex vertical={"column"} style={{marginTop: "1rem"}} justify='center' align='center'>
                   <VideoInput handleFileToFather={setFile}/>
            </Flex>
       </Col>

       <Col xs={24} span={3} md={12} >

       <Flex vertical="column" gap={"2rem"}>
       <TextArea
                showCount
                maxLength={100}
                onChange={(e)=> setInput(e.target.value)}
                placeholder="Write a text to your friends why is this video"
                style={{
                  height:80, 
                  width: "100%",
                  resize: 'none',
                  marginTop: "1.3rem"
                }}
        />
        <Button style={{width: '200px'}} type='primary' onClick={()=> handleMutate()}  loading={isLoading} danger={isError}>Uplaod video</Button>
       </Flex>     
       </Col>                   
    </Row>
    </>
  )
}

export default StoryVideo