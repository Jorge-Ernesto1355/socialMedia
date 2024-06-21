import React from 'react'
import './stories.css'
import {  Col,  Flex,  Row, Skeleton, Typography } from 'antd'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll/useInfiniteScroll'
import { storyService } from './services/storyService'
import useUserRequest from '../../../hooks/auth/useUserRequest'
import AuthProvider from '../../../zustand/AuthProvider'
import LoaderStories from './LoaderStories/LoaderStories'
import ModalStory from './modelStory/ModalStory'
import { useQuery } from 'react-query'
import OwnStory from './OwnStory'
import AliceCarousel from 'react-alice-carousel'

const Stories = () => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const {results, isLoading, isError: isErrorStories} = useInfiniteScroll({name: "stories", id: userId, request: storyService.getStoriesByUser, privateRequest})
    const {data: UserStories, isLoading: isLoadingStoriesUser, isError} = useQuery(['userStory', userId], ()=> storyService.getStoriesFromUser({privateRequest, id: userId}), {
      enabled: !!userId
    })

    if(isError || isErrorStories ) return <div>error</div>
    
    const responsive = {
      0: { items: 1 },
      368: { items: 2 },
      324: { items: 3 },
      524: { items: 4 },
      624: { items: 5 },
  };
 
  const items = results?.map((story)=> (
    <Col className='story-item' key={story._id}    xs={11} xl={8} xxl={6}  style={{height: '310px', width:"300px"}}>
      <ModalStory story={story} key={story?._id}/>
    </Col>
  ))

  


  return (
    <div className='story-container'>
        {isLoading && <LoaderStories/>}
        {!isLoading && (
              <Row  className='story-items'>                  
                    <Flex style={{width: "100%", height: "100%"}}>
                        <Col className='story-create' xs={7} xl={6} xxl={5}>
                          {isLoadingStoriesUser && <Skeleton.Avatar active={true} size={40} shape={"square"} style={{width: "155px", height: '258px', borderRadius: "1rem",}} />}
                          {!isLoadingStoriesUser  &&  <OwnStory userStories={UserStories?.data ?? []} />}
                        </Col>
                        <AliceCarousel
                          mouseTracking
                          disableDotsControls
                          disableButtonsControls
                          items={items}
                          responsive={responsive}
                          controlsStrategy="alternate"
                        />  
                    </Flex>
          </Row>
        )}
    </div>
  )
}

export default Stories