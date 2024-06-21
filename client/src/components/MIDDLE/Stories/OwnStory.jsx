import { Avatar, Card, Flex, Skeleton, Typography } from 'antd'
import React from 'react'
import ModalStories from './modalStories/ModalStories'
import { UserOutlined } from '@ant-design/icons';
import BlurImageLoader from '../../../utilities/BlurImageLoader';
import AuthProvider from '../../../zustand/AuthProvider';
import UserService from '../../../services/UserService';
import { useQuery } from 'react-query';
import useUserRequest from '../../../hooks/auth/useUserRequest';
import Paragraph from 'antd/es/typography/Paragraph';
import Video from './modelStory/Video';
const { Title} = Typography;
const OwnStory = ({userStories = []}) => {

    const privateRequest = useUserRequest()
    const {userId} = AuthProvider()
    const { data: user, isLoading} = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId}));
  return ( 
    <>
           {
            !!isLoading && <Skeleton.Avatar active={true} size={40} shape={"square"} style={{width: "155px", height: '258px', borderRadius: "1rem",}} />
           }
           {!isLoading && (

                <>
                     {userStories?.length <= 0 ? <Avatar src={user?.imageProfile?.url} icon={<UserOutlined/>} size={40} shape={"square"} style={{width: "100%", height: '80%', borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", display: "flex", justifyContent: "center", alignContent: "center"}}/> : (
                <>
                     {userStories[0].media.resourceType === "text" ? (

                            <Card style={{width: '100%', height: "80%", backgroundImage: userStories[0]?.media?.background}} bodyStyle={{width: '100%', height: "80%", display: "flex", justifyContent: "center", alignContent: "center"}}>
                                   <Paragraph ellipsis={{rows: 8}} style={{height:"80%"}} >
                                      <Title level={5} style={{color:"#ffffff"}}>{userStories[0]?.text}</Title>
                                   </Paragraph>
                            </Card>

                     ) : (
                        <>
                        {userStories[0].media.resourceType === "video" ?
                        (
                        <Video src={userStories[0].media.url} className='story-item-img' style={{height: "80%", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}/>
                        ) : 
                        (
                        <BlurImageLoader image={userStories[0]?.media?.url} preview={userStories[0]?.media?.previewUrl} alt={userStories[0]?.text} imageStyleClass={"story-item-img"} divStyleClass={"story-item-container-img"} />
                        )
                      }
                        </>
                     ) }
                    
                </>
            )}
                </>

           )}

            <Flex justify='center' align='center' className='story-create-info'>
            <ModalStories/>
            <Title style={{marginTop: "24px"}} level={5}>Create story</Title>
            </Flex>
    </>
  )
}

export default OwnStory


