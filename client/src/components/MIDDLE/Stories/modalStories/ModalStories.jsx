import React, { useState } from 'react';
import { Button, Flex, Form, Modal, Segmented, Select, Tag, Typography } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import StoryPhoto from './storyPhoto/StoryPhoto';
import StoryVideo from './StoryVideo/StoryVideo';
import StoryText from './StoryText/StoryText';
import InfoTimeExpiration from '../utils/InfoTimeExpiration';
const { Text, Title} = Typography;

function hoursToSeconds(hours) {
  if (typeof hours !== 'number' || hours < 0) {
    throw new Error('Please provide a valid number of hours');
  }
  
  const seconds = hours * 3600; // 1 hour = 3600 seconds
  return seconds;
}
const ModalStories= () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segmentedValue, setSegmentedValue] = useState("photo");
  const [expiresIn, setExpiresIn] = useState(hoursToSeconds(24))
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  const options = [
    { value: '24', label: '24h' },
    { value: '12', label: '12h' },
    { value: '5', label: '5h' },
    { value: '1', label: '1h' },
  ];

  const handleExpiresIn = (value) => {
    try {
      const hours = parseInt(value, 10); // Convierte la opción seleccionada en un número
      const seconds = hoursToSeconds(hours);
      setExpiresIn(seconds);
    } catch (error) {
      console.error(error.message);
      setExpiresIn(hoursToSeconds(24)); // Valor por defecto de 24 horas en caso de error
    }
  };


  const segmentedOptions = ["photo", "video", "text"]

  const renderComponent = () => {
    switch (segmentedValue) {
      case 'photo':
        return <StoryPhoto expiresIn={expiresIn} closeModal={()=> handleOk()}/>;
      case 'video':
        return <StoryVideo expiresIn={expiresIn} closeModal={()=> handleOk()} />;
      case 'text':
        return <StoryText expiresIn={expiresIn} closeModal={()=> handleOk()} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Button size='large' className='story-create-button' type='primary' shape='circle' onClick={showModal}>
      <PlusOutlined />
      </Button>
      <Modal width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Flex style={{width: "100%"}} align='center' justify='center'>
            <Title level={4}>Create a story</Title>
        </Flex>
        <Flex justify='space-between'>
            <Segmented
                options={segmentedOptions}
                onChange={(value) => {
                    setSegmentedValue(value);
                }}
            />
           <Flex gap={10}>
           <Select
                defaultValue="24H"
                style={{
                    width: 70,
                }}
                onChange={handleExpiresIn}
                options={options}
                />
               <InfoTimeExpiration/>
           </Flex>
           

        </Flex>
        <div>
       
          {renderComponent()}
        </div>
      </Modal>
    </>
  );
};

export default ModalStories;