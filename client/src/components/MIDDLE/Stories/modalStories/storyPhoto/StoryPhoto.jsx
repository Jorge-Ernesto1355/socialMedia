import React, { useRef, useState } from 'react';
import {  LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {  Button, Col, Divider, Flex, Image, Row, Typography, Upload, message } from 'antd';
import { getBase64 } from '../../../../Profile/header/modalProfilePicture/util/getBase64';
import "./storyPhoto.css"
import TextArea from 'antd/es/input/TextArea';
import { useMutation } from 'react-query';
import { storyService } from '../../services/storyService';
import AuthProvider from '../../../../../zustand/AuthProvider';
import useUserRequest from '../../../../../hooks/auth/useUserRequest';
import { validateFile } from '../../utils/validateFile';
const { Dragger } = Upload;


const { Text } = Typography;
const StoryPhoto = ({expiresIn = 86400, closeModal}) => {
  
  const {userId} = AuthProvider()
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("")
  const file = useRef()
  
  
  const privateRequest = useUserRequest()
  const {mutate, isLoading, isError} = useMutation({
    mutationFn: storyService.createStoryPhoto, 
      mutationKey: ['story-creation', userId], 
      onSuccess: ()=> {
        message.success("story created succefully")
        closeModal()
      }, 
      onError: ()=> message.error("Something went wrong, try again later")
    })



    
    const handleMutate = ()=>{

      if(!file.current) return 
      mutate({
        privateRequest, 
          story: {
            text: input,
            image: file.current,
            expiresIn: expiresIn, 
          }, 
          userId
        })
      
      }
      
      
      const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
    
        if (validateFile(info.file.originFileObj)) {
            getBase64(info.file.originFileObj, (url) => {
                file.current = info.file.originFileObj;
                setLoading(false);
                setImageUrl(url);
                file.current = info.file.originFileObj
            });
        }
    };
      
    const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
          const image = new Image();
          image.src = src;
          const imgWindow = window.open(src);
          imgWindow?.document.write(image.outerHTML);
        };
        
        const beforeUpload = (e)=>{
            return validateFile(e)
        }
        

    const props = {
      className: "story-dragger-img",
      name: 'image',
      onChange:(e)=> handleChange(e),
      onPreview,
      beforeUpload, 
      showUploadList: false
    };


    
    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
          <Text type='secondary'>Drag and drop an image or <Button type="link">Choose File</Button> </Text>
        </button>
      );

  return  (
    <Row gutter={30} style={{ padding: '0 1rem' }}>
      <Col xs={24} md={10}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1rem'
          }}
        >
          <Dragger {...props}>
            {imageUrl ? <img className='story-upload-img' src={imageUrl} alt="uploaded" /> : uploadButton}
          </Dragger>
          <Text type='secondary'>
            Image must be less than <Text>5mb</Text> and more than <Text>1mb</Text>
          </Text>
        </div>
      </Col>

      <Col xs={24} md={14}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '1.3rem'
          }}
        >
          <TextArea
            showCount
            maxLength={100}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write something about your story so your friends can understand it"
            style={{
              height: 80,
              resize: 'none',
              width: '100%'
            }}
          />
          <Button type='primary' danger={isError} block onClick={handleMutate} loading={isLoading}>
            Upload story
          </Button>
        </div>
      </Col>
    </Row>
  );
};
export default StoryPhoto;