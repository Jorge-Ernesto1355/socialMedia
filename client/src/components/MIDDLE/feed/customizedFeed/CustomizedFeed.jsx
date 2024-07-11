import React, { useState } from 'react'
import './customizedFeed.css'
import { Button, Divider, Flex, Tag, Typography, message } from 'antd';
import SearchSklills from './components/SearchSklills';
import InterestsAndSkills from './components/InterestsAndSkills';
import UserService from '../../../../services/UserService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import AuthProvider from '../../../../zustand/AuthProvider';
import { interests } from './utils/interests';
import { useMutation } from 'react-query';
import { EditOutlined } from '@ant-design/icons';
const { Text, Title} = Typography;
const CustomizedFeed = ({refetch = ()=>{}}) => {
  
    const [skills, setSkills] = useState([])
    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const {mutate, isLoading, isError} = useMutation({
        mutationFn: UserService.customizeFeed, 
        mutationKey: ['updatedProfile', userId], 
        onSuccess: ()=> {
            message.success("Has been personalized your feed")
            refetch()
        }, 
        onError: ()=> message.error("Upss... Something went wrong")
        
    })

    const handleDeleteSkill = (skill)=>{
        if(!skill) return 
        const filtredSkills = skills.filter((item)=> item !== skill)
        setSkills(filtredSkills) 
    }

    const handleAddKills = (skill)=>{
        if(!skill) return 
        setSkills((prev)=> {
            const exists = prev.find((item)=> item === skill)
            if(!exists) return [...prev, skill]
            else return [...prev] 
        })
        }

    const handleMutate = ()=>{
        mutate({
            privateRequest, 
            id:userId, 
            interests: skills 
        })
    }


    
  return (
    <div className='customizedFeed-container'>
        <Title level={4} style={{marginBottom: '.3rem'}}>Choose your interests and skills</Title>
        <Text>Personalize your experience  by picking 3 or more topics</Text>
        <Divider/>
        
        <SearchSklills handleAddSkills={handleAddKills}  />

        <Flex vertical style={{marginTop: "2rem"}}>
            <Title level={5}>Skills selected</Title>
            
            {
                <ul className='selected-skills-container'>
                    <>
                        {skills.length > 0 ?  (
                            <>
                                {skills?.map((skill, index)=> (
                                        <Tag bordered={false} closeIcon onClose={()=> handleDeleteSkill(skill)} className='tag-skill' key={index}>
                                            {skill}
                                        </Tag>
                                    ))}
                            </>
                        ) : (
                            <Text type='secondary'>No skills selected yet</Text>
                        )}
                    </>
                   </ul>
            }

         </Flex>
        <Button type='primary' style={{marginTop: "1rem"}}  block loading={isLoading} danger={isError} onClick={()=> handleMutate()} icon={<EditOutlined />}> Customize your feed</Button>

         
         <InterestsAndSkills handleAddKills={handleAddKills}/>

        
    </div>
  )
}

export default CustomizedFeed