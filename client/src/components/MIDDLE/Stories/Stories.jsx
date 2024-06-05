import React from 'react'
import './stories.css'
import { Avatar,  Col, Flex, Row, Skeleton, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import ModalStories from './modalStories/ModalStories'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll/useInfiniteScroll'
import { storyService } from './services/storyService'
import useUserRequest from '../../../hooks/auth/useUserRequest'
import AuthProvider from '../../../zustand/AuthProvider'
import LoaderStories from './LoaderStories/LoaderStories'
import ModalStory from './modelStory/ModalStory'
import BlurImageLoader from '../../../utilities/BlurImageLoader'

const { Title, Text} = Typography;
const Stories = () => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const {results, isLoading, isError} = useInfiniteScroll({name: "stories", id: userId, request: storyService.getStoriesByUser, privateRequest})

    const {results: UserStories, isLoading: isLoadingUser, isError: UserError} = useInfiniteScroll({name: "stories", id: userId, request: storyService.getStoriesFromUser, privateRequest})
   
    
   

  return (
    <div className='story-container'>
        {isLoading && <LoaderStories/>}
        {!isLoading && (
              <Row  className='story-items'>                  
                    <Col className='story-create'  span={5}>
                      {isLoadingUser && <Skeleton.Avatar active={true} size={40} shape={"square"} style={{width: "155px", height: '258px', borderRadius: "1rem",}} />}
                      {!isLoadingUser && (
                          <>
                                 <BlurImageLoader image={UserStories[0]?.media?.url} preview={UserStories[0]?.media?.previewUrl} alt={UserStories[0]?.text} imageStyleClass={"story-item-avatar"} divStyleClass={"story-create-container-img"}/>
                                  <Flex justify='center' align='center' className='story-create-info'>
                                    <ModalStories></ModalStories>
                                    <Title style={{marginTop: "24px"}} level={5}>Create story</Title>
                                  </Flex>
                          </>
                      )}

                    </Col>
                  {results?.map((story)=> (
                    <ModalStory tory story={story} key={story?._id}/>
                  ))}

                  
          </Row>
        )}
    </div>
  )
}

export default Stories