import { Col, Empty, Flex, Row, Typography } from 'antd';
import React from 'react'
import LoaderStories from '../../MIDDLE/Stories/LoaderStories/LoaderStories';
import ModalStory from '../../MIDDLE/Stories/modelStory/ModalStory';
import useUserRequest from '../../../hooks/auth/useUserRequest';
import AuthProvider from '../../../zustand/AuthProvider';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll/useInfiniteScroll';
import InfiniteScroll from 'react-infinite-scroll-component';
import ComponentStateHandler from '../../../hooks/stateManagmentComponent/ComponentStateHandler';
import UserService from '../../../services/UserService';
import { storyService } from '../../MIDDLE/Stories/services/storyService';
import EmptyStories from '../../MIDDLE/Stories/EmptyStories';
const { Text, Title} = Typography;
const StoriesProfile = ({userId}) => {
    const privateRequest = useUserRequest()

    const { results, isLoading, isError,  hasNextPage, fetchNextPage, reset, refetch } =
    useInfiniteScroll({
      name: "feedPosts",
      request: storyService.getFeedStories,
      privateRequest,
      id: userId
    });
  return (
    <div>
        <Title level={4}>Stories</Title>
        <Text>These are stories of your friends but also about your interests</Text>
        <InfiniteScroll
            dataLength={results?.length}
            hasMore={hasNextPage || isLoading}
            loader={< LoaderStories />}
            next={() => fetchNextPage()}
            >
            <ComponentStateHandler isLoading={isLoading} isError={isError} Loader={<LoaderStories/>} EmptyMessage={<Flex style={{marginTop: "2rem"}}><EmptyStories/></Flex>} ErrorMessageComponent={"error"} items={results}>
                <Row gutter={20}>
                {results?.map((story) => (
                    <Col span={6} key={story._id} style={{height: '250px', width:"300px", boxShadow: "var(--card-shadow)"}}>
                       <ModalStory story={story} key={story?._id}/>
                    </Col>
                ))}
                </Row>
            </ComponentStateHandler>
    </InfiniteScroll>
    </div>
  )
}

export default StoriesProfile