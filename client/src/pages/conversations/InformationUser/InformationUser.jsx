import { UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Divider, Flex, Row, Tag, Typography } from 'antd'

import './InformationUser.css'
import React from 'react'
import EmailIcon from '../icons/EmailIcon';
import PhoneIcon from '../icons/PhoneIcon';
import PlaceMarker from '../../../components/Profile/Details/icons/PlaceMarker';
import { useQuery } from 'react-query';
import useUserRequest from '../../../hooks/auth/useUserRequest';
import userService from '../../../services/UserService';
import MutualFriends from '../../../utilities/MutualFriends';

const { Text, Title} = Typography;
const InformationUser = ({userId}) => {


    const privateRequest = useUserRequest()
    const { data: user, isLoading} = useQuery(["usertoFriend", userId], () => userService.getUser({ privateRequest, userId , options: ["city", "country","state", "bio", "interests", "friends" ]}));
    

    
    

  return (
    <div className='informationUser-container'>
        {isLoading && <>loading</>}
        {!isLoading && (
            <>
            <Flex vertical className='informationUser-header'>
            <Avatar src={user?.imageProfile?.url} size={80} icon={<UserOutlined></UserOutlined>}/>
            <Title style={{marginBottom: '0'}} level={5}>{user?.username ?? "UniVerse user"} </Title>
            <Text type='secondary' >{user?.email}</Text>
            {user?.bio && (
                    <>
                        <Text>Bio</Text>
                        <Text type='secondary' style={{width:"100%", textAlign: "center"}}>
                            {user?.bio}
                        </Text>
                    </>
            )}
        </Flex>
        <Divider></Divider>
        <Flex vertical style={{width: "100%"}}>
            <ul className='informationUser-contact-container'>
                    <Flex gap={10} align='center' className='informationUser-contact-item'> 
                        <div className='informationUser-contact-icon'>
                            <EmailIcon/>
                        </div>
                        <Flex vertical>
                                <Text type='secondary'>Email</Text>
                                <Title level={5} style={{margin: 0}}>{user?.email}</Title>
                        </Flex>
                    </Flex>
                    <Flex gap={10} align='center' className='informationUser-contact-item'> 
                        <div className='informationUser-contact-icon'>
                            <PhoneIcon/>
                        </div>
                        <Flex vertical>
                                <Text type='secondary'>Phone</Text>
                                <Title level={5} style={{margin: 0}}>+ {user?.phone ?? "not phone asigned"}</Title>
                        </Flex>
                    </Flex>
                    <Flex gap={10} align='center' className='informationUser-contact-item'> 
                        <div className='informationUser-contact-icon'>
                            <PlaceMarker/>
                        </div>
                        <Flex vertical>
                                <Text type='secondary'>Address</Text>
                                <Title level={5} style={{margin: 0}}>{user?.city}, {user?.state}, {user?.country}</Title>
                        </Flex>
                    </Flex>

                    <Title level={5} style={{marginTop: "1rem"}}>Preference</Title>
                    <div className="details-tags-container">
                    {user?.interests.map((tag)=> (
                      <Tag key={tag}>
                        {tag}
                      </Tag>
                    ))}
                </div>
            </ul>

        </Flex>
        
           
        
        
            </>
        )}
    </div>
  )
}

export default InformationUser