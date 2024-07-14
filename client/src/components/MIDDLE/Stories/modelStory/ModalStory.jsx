import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Modal, Typography, Carousel, Spin, Skeleton, Card } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import "./modalStory.css";
import { storyService } from '../services/storyService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import { useCallbackRequest } from '../../../../hooks/useCallbackRequest/useCallbackRequest';
import BlurImageLoader from '../../../../utilities/BlurImageLoader';
import { useQuery } from 'react-query';
import Story from './Story';
import Video from './Video';

const { Title, Paragraph, Text } = Typography;

const ModalStory = ({ story }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const privateRequest = useUserRequest();

  const {data, isLoading, refetch, isError} = useQuery(
    ['stories', story?.userId?._id],
    () => {
      if (!story?.userId?._id) {
        // Si no hay ID de usuario, devolvemos una promesa resuelta con un array vacío
        return Promise.resolve([]);
      }
      return storyService.getStoriesFromUser({privateRequest, id: story.userId._id});
    },
    {
      enabled: false,
      // Añadimos una condición para que la query se considere lista solo si hay un ID de usuario
      isDataEqual: (oldData, newData) => 
        !story?.userId?._id || (oldData === newData)
    }
  );


  const showModal = () => {
    setIsModalOpen(true);
    refetch()
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      {isError && <Text type='danger'>Upps... Something went wrong</Text>}
      {!isError && 
          <div style={{height: "100%", position: "relative"}} onClick={() => showModal()} >

              {story.media.resourceType === "text" ? (
                <Card style={{width: '100%', height: "100%", backgroundImage: story.media.background}} bodyStyle={{width: '100%', height: "80%", display: "flex", justifyContent: "center", alignContent: "center"}}>
                   <Paragraph style={{ height: "100%"}} ellipsis={{rows: 8}} >
                        <Title level={5} style={{color:"#ffffff"}}>{story.text}</Title>
                   </Paragraph>              
                </Card>
              ) : (
                <>
                 {story.media.resourceType === "video" ? (
                  
                    <Video src={story.media.url} className='story-item-img' />
                  ) : (
                    <BlurImageLoader  image={story?.media?.url} preview={story?.media?.previewUrl} alt={story?.text} imageStyleClass={"story-item-img"} divStyleClass={"story-item-container-img"} />
                  )}
                </>
              ) }
            <Avatar size={40} className='story-modal-avatar' src={story?.userId?.imageProfie?.url} icon={<UserOutlined />} />
            <Paragraph ellipsis={false}>
              <Title style={{ color: "#ffffff" }} level={5} className='style-item-username'>{story?.userId?.username}</Title>
            </Paragraph>
          </div>
      }
      <Modal
        style={{ height: "800px", padding: "0px" }}
        className='modal-story-container'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        closeIcon={null}
        styles={{ content: { padding: "0px", background: "none" } }}
      >
        {isLoading && <Skeleton.Image style={{width: "500px", height: "800px"}}></Skeleton.Image>}
        {!isLoading && (
          <Carousel
          lazyLoad={"progressive"}
          dotPosition='top'
          arrows
          infinite={false}
          autoplay
        >
          {data?.data?.map((story) => (
             <Story story={story} key={story._id}></Story>
          ))}
        </Carousel>
        )}
      </Modal>
    </>
  );
};

export default ModalStory;
