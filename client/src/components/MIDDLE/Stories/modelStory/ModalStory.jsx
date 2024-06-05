import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Modal, Typography, Carousel, Spin, Skeleton } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import "./modalStory.css";
import { storyService } from '../services/storyService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import { useCallbackRequest } from '../../../../hooks/useCallbackRequest/useCallbackRequest';
import BlurImageLoader from '../../../../utilities/BlurImageLoader';

const { Title } = Typography;

const ModalStory = ({ story }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingSlides, setLoadingSlides] = useState(new Set());
  const initialLoadRef = useRef(false);
  const privateRequest = useUserRequest();

  const { data, isLoading} = useCallbackRequest({
    name: "stories",
    id: story?.userId?._id,
    request: storyService.getStoriesFromUser,
    privateRequest
  });

  

  useEffect(() => {
    if (data?.data?.length > 0 && !initialLoadRef.current) {
      const initialLoadingSlides = new Set(data.data.map((_, index) => index));
      setLoadingSlides(initialLoadingSlides);
      initialLoadRef.current = true;
    }
  }, [data]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageLoad = (index) => {
    setLoadingSlides((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  return (
    <>
      <Col className='story-item' span={5} onClick={() => showModal()}>
        <BlurImageLoader image={story?.media?.url} preview={story?.media?.previewUrl} alt={story?.text} imageStyleClass={"story-item-img"} divStyleClass={"story-item-container-img"} />
        <Avatar size={40} className='story-modal-avatar' src={story?.userId?.imageProfie?.url} icon={<UserOutlined />} />
        <Title style={{ color: "#ffffff" }} level={5} className='style-item-username'>{story?.userId?.username}</Title>
      </Col>
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
          {data?.data?.map((story, index) => (
            <div className='story-carousel-item' key={story?._id} style={{ position: 'relative' }}>
              {loadingSlides.has(index) && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: '2px solid #fff',
                  zIndex: 1
                }}>
                  <Spin />
                </div>
              )}
              <img
                src={story?.media?.url}
                className='story-carousel-item-img'
                alt=""
                onLoad={() => handleImageLoad(index)}
                style={{
                  width: '100%',
                  filter: loadingSlides.has(index) ? 'brightness(0.5)' : 'none',
                  transition: 'filter 0.3s ease'
                }}
              />
            </div>
          ))}
        </Carousel>
        )}
      </Modal>
    </>
  );
};

export default ModalStory;
