import React from 'react'
import './userSuggestion.css'
import { Avatar, Button, Flex, Typography, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useMutation } from 'react-query';
import AuthProvider from '../../../zustand/AuthProvider';
import UserService from '../../../services/UserService';
import useUserRequest from '../../../hooks/auth/useUserRequest';
const { Text, Title, Paragraph} = Typography;
const UserSuggestion = ({user = {}}) => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const { mutate, isLoading, isError, isSuccess} = useMutation(['addFriend', user?._id], ()=> UserService.addFriend({userId, addUserId: user?._id, privateRequest}), {
        onSuccess: ()=> message.success("request has been sended succefully"), 
        onError: ()=> message.error("Ups... something went wrong")
    })

    const handleMutate = ()=>{
        mutate({
            userId, 
            addUserId: user?._id
        })
    }


  return (
    <div className='userSuggestion-container' >
           <Flex vertical justify='center' align='center'>
              <Avatar src={user?.imageProfile?.url} icon={<UserOutlined/>} size={100}/>
              <Paragraph ellipsis style={{textAlign: "center", width: "90%"}}>
                  <Title style={{marginBottom: "0"}} level={4}>{user?.username}</Title>
              </Paragraph>
              <Paragraph  style={{textAlign: "center", width: "90%", height: "60px"}}  ellipsis={{rows: 3}}>
                  <Text style={{width: "20px"}} type='secondary'  >{user?.bio}</Text>
              </Paragraph>
              <Button type='primary' loading={isLoading} danger={isError} disabled={isSuccess}  onClick={()=> handleMutate()}>
                 <Text style={{ color: isSuccess ? "" : "#ffffff",}} level={5} >{isSuccess ? "Sended request" : "Send request"}</Text>
              </Button>
           </Flex>
    </div>
  )
}

export default UserSuggestion 