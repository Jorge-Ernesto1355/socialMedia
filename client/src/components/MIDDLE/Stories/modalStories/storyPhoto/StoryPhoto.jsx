import React, { useState } from 'react';
import {  UploadOutlined } from '@ant-design/icons';
import {  Button, Divider, Flex, Image, Input, Typography, Upload, message } from 'antd';
import { getBase64 } from '../../../../Profile/header/modalProfilePicture/util/getBase64';
import "./storyPhoto.css"
import TextArea from 'antd/es/input/TextArea';
import { useMutation } from 'react-query';
import { storyService } from '../../services/storyService';
import AuthProvider from '../../../../../zustand/AuthProvider';

const { Text, Title} = Typography;
const StoryPhoto = () => {

    const {userId} = AuthProvider()
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const {mutate, isLoading, isError} = useMutation({
      mutationFn: storyService.createStoryPhoto, 
      mutationKey: ['story-creation', userId], 
      onSuccess: ()=> message.success("story created succefully"), 
      onError: (error)=> {
        console.log(error)
      }
    })

    
    const handleMutate = ()=>{
      
    }
    

    const handleChange = (info) => {
       
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }

        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
            
          });     
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
        

    const props = {
        onChange: handleChange,
        onPreview,
        block: true,
        name: 'coverPicture',
        showUploadList: false,
      };


      

  return (
    <>
            <Divider/>  
            <Flex  >
                <Flex vertical={"column"} style={{marginTop: "1rem"}} justify='center' align='center'>
                {imageUrl && (
                    <>
                        <img className='story-upload-img' src={imageUrl}/>
                        <Text style={{marginTop: "10px"}} type="secondary">this picture i will be closed up to the story</Text>
                    </>
                )}
                {!imageUrl && (
                    <>
                        <div className='story-notStory-img'></div>
                        <Text style={{marginTop: "10px"}} type='secondary'>Try to the photo has the next dimensions 500 x 800 </Text>
                    </>
                )}
                    
                    <Upload {...props}>
                        <Button loading={loading}  style={{marginTop: "20px",}} block={true} icon={<UploadOutlined />}>Upload the story</Button>
                    </Upload>   
                </Flex>

               <Flex vertical="column" gap={"2rem"}>
               <TextArea
                        showCount
                        maxLength={100}
                        onChange={()=> console.log('si')}
                        placeholder="disable resize"
                        style={{
                            height:80, 
                            width: 400,
                            resize: 'none',
                            marginTop: "1.3rem"
                        }}
                        />

                <Button type='primary' block onClick={handleMutate}>Upload story</Button>
               </Flex>
                    
               
                
                
                
                        
            </Flex>
    </>
  );
};
export default StoryPhoto;