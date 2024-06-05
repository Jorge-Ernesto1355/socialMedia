import React, { useState } from 'react';
import { Button, Flex, Form, Modal, Segmented, Select, Tag, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StoryPhoto from './storyPhoto/StoryPhoto';
import StoryVideo from './StoryVideo/StoryVideo';
import StoryText from './StoryText/StoryText';
const { Text, Title} = Typography;
const ModalStories= () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segmentedValue, setSegmentedValue] = useState("photo");
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
    { value: '24h', label: '24h' },
    { value: '12h', label: '12h' },
    { value: '5h', label: '5h' },
    { value: '1h', label: '1h' },
  ];

  const segmentedOptions = ["photo", "video", "text"]

  const renderComponent = () => {
    switch (segmentedValue) {
      case 'photo':
        return <StoryPhoto />;
      case 'video':
        return <StoryVideo />;
      case 'text':
        return <StoryText />;
      default:
        return null;
    }
  };

  return (
    <>
      <Button size='large' className='story-create-button' type='primary' shape='circle' onClick={showModal}>
      <PlusOutlined />
      </Button>
      <Modal width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <Select
                defaultValue="24H"
                style={{
                    width: 70,
                }}
                suffixIcon={null}
                onChange={(e)=> console.log(e)}
                options={options}
                />
        </Flex>
        <div>
       
          {renderComponent() }
        </div>
      </Modal>
    </>
  );
};

export default ModalStories;