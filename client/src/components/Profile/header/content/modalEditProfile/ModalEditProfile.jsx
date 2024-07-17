import { EditOutlined,} from '@ant-design/icons';
import {  Button, Divider, Flex, Input, Modal,  Skeleton,  Switch, Typography, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import UserService from '../../../../../services/UserService';
import { useMutation, useQuery } from 'react-query';
import useUserRequest from '../../../../../hooks/auth/useUserRequest';
import EditProfileTags from './editProfileTags/EditProfileTags';
import InputNumber from './InputNumber';
import { isValidEmail } from '../../../../../utilities/isValidEmail';
import AuthProvider from '../../../../../zustand/AuthProvider';
import ModalSetSkills from '../../../../skills/ModalSetSkills';
const { Text, Title} = Typography;
const ModalEditProfile = () => {

    const {userId} = AuthProvider()
    const [userInfo, setUserInfo] = useState({})
    const [tags, setTags] = useState(["programming", "react", "javascript"])
    
    const handleUserInfo = (e)=>{
        const {value, name} = e.target
        if(!value && !name) return 
        setUserInfo((prevUserInfo)=>{
           return {...prevUserInfo, [name]: value }
            
        })
    }   

    const handleChecked = (e)=> {
        const {name, value} = e
         // eslint-disable-next-line no-useless-computed-key
        setUserInfo((prev)=> {
            return {...prev, [name]: value}
        })
    }
    
  

    const privateRequest = useUserRequest()
    const { data: user, isLoading: isLoadingUser } = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId , options: ["coverPicture"]}));

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => setIsModalOpen(true);
        
    const handleCancel = () => setIsModalOpen(false);
         
        
        
    const {mutate, isLoading, error} = useMutation({
            mutationFn: UserService.uploadUserProfile, 
            mutationKey: ['updatedProfile', userId], 
            onSuccess: (data)=> message.success("Your profile has been edited succefully"), 
            onError: ()=> message.error("Upss... Something went wrong")
            
        })
        
        const handleMutate = () => {
          
          mutate({
              privateRequest, 
              id: userId,
              userInfo: {...userInfo, interests: tags} 
          })
        };
        
        
  return (
    <>
     <Button onClick={showModal} type='primary' icon={<EditOutlined />}>Editar</Button>
        <Modal open={isModalOpen}  footer={null} onCancel={handleCancel} confirmLoading={isLoading} width={500} >
           
                
                    <Title style={{marginBottom: "0px"}} level={3}>Edit profile</Title>
                    <Text >Provide details about yourself and any other pertinent information</Text>
                
                <Divider></Divider>
                <Title level={4} >Basic information</Title>
                <Flex gap={"middle"} vertical="horizontal">
                    <Flex vertical="horizontal">
                        <label htmlFor="username">Username</label>
                        {isLoadingUser ? <Skeleton.Input active={true} block/> :  <Input onChange={handleUserInfo} name='username' placeholder={user?.username ?? 'Write your username'}/>}
                    </Flex>
                    <Flex vertical="horizontal">
                        <label htmlFor="username">Email</label>
                        {isLoadingUser ? <Skeleton.Input active={true} block/> :  <Input onChange={handleUserInfo} name='email' placeholder={user?.email ?? 'Write your email'}/>}
                    </Flex>
                    <Flex vertical="horizontal">
                        <label htmlFor="username">Number</label>
                        {isLoadingUser ? <Skeleton.Input active={true} block/> :  <InputNumber onChange={handleUserInfo} name="number" inputNumberValue={userInfo?.number ?? null} placeholder={user?.number ?? 'Write your number'}></InputNumber>}
                        
                    </Flex>
                   
                    <Flex  gap={"large"} justify='space-between' align='center'>
                        <Title level={5}>Make your email publicy visible</Title>
                        <Switch onChange={(e)=> handleChecked({name: "showEmail", value: e})}></Switch>
                    </Flex>
                    
                </Flex >
                <Flex vertical="horizontal">
                        <label htmlFor="username">Bio</label>
                        <TextArea
                         onChange={handleUserInfo}
                         name='bio'
                         showCount
                         maxLength={100}
                         style={{ height: 80, resize: 'none' }}
                         placeholder={user?.bio ?? 'Example: Hey everyone im designer and blogger. i love to like  ski and valet' }/>
                         <Text>Brief description for your profile. Urls are hyperlinked.</Text>
                </Flex>
                <Flex vertical style={{marginTop: "1rem", width: "100%" }} >
                        <Title level={4}>Interests</Title>
                        <Text>Here you can customize your feed or even add more interests <ModalSetSkills><Button  type='link'>Set skills</Button></ModalSetSkills></Text>
                </Flex>
                
                
                <Flex vertical gap={10} style={{marginTop: "1rem"}} justify='start' >
                  <Text type='danger'>{error?.response.data.error}</Text>
                    <Button block type='primary' loading={isLoading} onClick={()=> handleMutate()}>Edit Profile</Button>
                </Flex>
        </Modal>
    </>
  )
}

export default ModalEditProfile