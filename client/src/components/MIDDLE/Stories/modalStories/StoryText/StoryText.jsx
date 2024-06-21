import { Button, Card, Col, Divider, Flex, Row, Typography, message } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import BackroundsStories from './BackroundsStories';
import { storyService } from '../../services/storyService';
import AuthProvider from '../../../../../zustand/AuthProvider';
import useUserRequest from '../../../../../hooks/auth/useUserRequest';
import { useMutation } from 'react-query';
const { Text, Title} = Typography;


const StoryText = ({expiresIn = 86400, closeModal}) => {

  const {userId} = AuthProvider()
  const [input, setInput] = useState("")
  const [background, setBackground] = useState('linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)')

   
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

      if(!input || input.length <= 0) return 
 
      mutate({
        privateRequest, 
          story: {
            text: input,
            background,
            expiresIn: expiresIn, 
          }, 
          userId
        })
      
      }

  return (
    <>
      <Divider/>  
            <Row gutter={30} >
               
               <Col span={10} xs={24} md={10}>
                  <Flex  vertical={"column"} style={{marginTop: "1rem", height: "500px"}} justify='center' align='center' >
                    <Title level={5}>Preview</Title>
                    <Card style={{width: '100%', height: "100%", backgroundImage: background}} bodyStyle={{width: '100%', height: "100%", display: "flex", justifyContent: "center", alignContent: "center"}}>
                        <Title level={5} style={{color:"#ffffff"}}>{input}</Title>
                    </Card>
                    </Flex>
               </Col>

               <Col xs={24} md={12} span={6}>

               <Flex  vertical="column" gap={"2rem"}>
               <div>
               <Title level={5} style={{marginBottom:"0", marginTop: "1rem"}} >Write a comment</Title>
               <TextArea
                        showCount
                        maxLength={150}
                        onChange={(e)=> setInput(e.target.value)}
                        placeholder="Write something about your story for your friends can undersand them"
                        style={{
                            height:80, 
                            width: "100%",
                            resize: 'none',
                            marginTop: ".7rem"
                        }}
                        />
               </div>
                <Flex vertical style={{width: "100%"}}>
                <Title level={5}>Backgrounds</Title>
                    <BackroundsStories handleBackground={setBackground}/>
                </Flex>

                <Button type='primary' loading={isLoading} danger={isError} block  onClick={()=> handleMutate()} >Upload story</Button>
               </Flex>     
               </Col>                   
            </Row>
    </>
  )
}

export default StoryText