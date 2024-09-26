import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography, message } from 'antd';
import React, { useState } from 'react'
import './storyVide.css'
import { validateVideo } from '../../utils/validateVideo';
import Dragger from 'antd/es/upload/Dragger';
const { Text } = Typography;
const VideoInput = ({handleFileToFather}) => {
    const [loading, setLoading] = useState(false);
    const [source, setSource] = React.useState(null);
  
    const handleFileChange = (event) => {
        const file = event.file.originFileObj || event.file;
    
        if (!(file instanceof Blob)) return message.error("the video is not valid")
    
        setLoading(true); 
        handleFileToFather(file);
    
        if (!isValidVideo(file)) {
          message.error("the file selected is not a valid video");
          setLoading(false);
          return 
        }

          const readerFileVideo = new FileReader();
          readerFileVideo.onload = (e) => {
            setSource(e.target.result); 
            setLoading(false); 
          };
          
          readerFileVideo.readAsDataURL(file); 
       
        }
    
  
    
    const isValidVideo = (file)=> file.type.startsWith("video/")

    
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
        <Text type='secondary'>Drag and drop an image or <Button type="link">Choose File</Button> </Text>
      </button>
    );

 

    const props = {
      accept: ".mov,.mp4",
      className: "story-dragger-img",
      name: 'image',
      type: "file",
      onChange:(e)=> handleFileChange(e),
      beforeUpload: (video)=> validateVideo(video), 
      showUploadList: false
    };
  
    return (
      <div className="VideoInput">
        <Dragger  {...props} >
               {source ? 
                  <video
                  className="story-video-preview"
                  width="100%"
                  height={"100%"}
                  controls
                  src={source}
                />
                :
                uploadButton
              }
       </Dragger>
      </div>
    );
  }

export default VideoInput