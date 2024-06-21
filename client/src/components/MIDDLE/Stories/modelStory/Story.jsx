import React from 'react'
import BlurImageLoader from '../../../../utilities/BlurImageLoader'
import { Button, Card, Col, Flex, Input, Row, Typography } from 'antd';
import './Story.css'
import Video from './Video';
import StoryAction from './StoryAction';
const { Title} = Typography;


const StoryMedia = ({ media , text}) => {
    if (!media || !media.resourceType) {
      return null;
    }
  
    if (media.resourceType === "text") {
      return (
        <Card style={{width: '100%', height: "100%", backgroundImage: media?.background}} bodyStyle={{width: '100%', height: "100%", justifyContent: "center", alignContent: "center"}}>
                        <Title level={4} style={{color:"#ffffff"}}>{text}</Title>
        </Card>
      );
    } else if (media.resourceType === "video") {
      return <Video className="story-carousel-video" src={media.url} />;
    } else {
      return (
        <BlurImageLoader
          image={media.url}
          preview={media.previewUrl}
          alt={media.text}
          imageStyleClass={"story-carousel-item-img"}
          divStyleClass={"story-carousel-item-container-img"}
        />
      );
    }
  };
const Story = ({story = {}}) => { 
  return (
    <div className='story-carousel-item' key={story?._id} style={{ position: 'relative' }}>
            <StoryMedia media={story?.media} text={story?.text} />
            <StoryAction friendId={story.userId._id} storyId={story._id}/>
        </div>
  )
}

export default Story

