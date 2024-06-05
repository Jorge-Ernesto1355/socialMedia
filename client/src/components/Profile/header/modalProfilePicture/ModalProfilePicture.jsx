
import React, { useState } from 'react'
import UserService from '../../../../services/UserService';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import './modalProfilePicture.css'
import { useCallbackRequest } from '../../../../hooks/useCallbackRequest/useCallbackRequest';
import SpinnerLoader from '../../../../stylesComponents/spinnerLoader/SpinnerLoader';
import { Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload,  Divider, Modal, Typography, message} from 'antd';
import { beforeUpload } from './util/beforeUpload';
import { getBase64 } from './util/getBase64';
import ImgCrop from 'antd-img-crop';
import ImageToProfilePicture from './Image/ImageToProfilePicture';


const { Text, Title} = Typography;



const ModalProfilePicture = ({children, userId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    
  
    const showModal = () => setIsModalOpen(true);
  
    const handleOk = () => setIsModalOpen(false);

    const handleCancel = () => setIsModalOpen(false);


    const handleChange = (info) => {
      
      
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }

      if(info.file.status === "error") {
        message.error("Something went wrong")
        setImageUrl(null)
      }
      if (info.file.status === 'done') {
        
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
          message.success("photo upladed succefully")
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
      
      
      const privateRequest = useUserRequest()
      const { data, isLoading} =
        useCallbackRequest({
          name: "photos",
          request: UserService.getPhotos,
          privateRequest,
          id: userId
        });

        const uploadButton = (
          <button
            style={{
              border: 0,
              background: 'none',
            }}
            type="button"
          >
            {loading ? <Loading3QuartersOutlined /> : <PlusOutlined />}
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </button>
        );
      
  return (
    <>
        {React.cloneElement(children, {onClick: ()=> showModal()})}
      <Modal style={{width: "900px"}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      
        <div className='modal-profile-header'>
            <Title style={{ marginBottom: "0px"}}  level={4}>Upload your profile image</Title>
            <Text  >Choose an image that will appear everywhere in our app.</Text>
        </div>      
    
       <div className='modal-profile-uploadPhoto'>
       <Title   level={4}>Upload your image</Title>
      <ImgCrop rotationSlider>
      <Upload
        rootClassName='avatar-uploader'
        name='avatar'
        showUploadList={false}
        action={`http://localhost:3001/api/v1/users/upload/${userId}`}
        listType="picture-circle"
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            className='modal-profile-uploadPhoto-img'
            src={imageUrl}
            alt="avatar"
           
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
    <Text style={{marginTop: "10px"}}>Only accept Jpeg and Png and max 2mb size  </Text>
       </div>
       <Divider plain>OR</Divider>
       <Title style={{marginTop:"20px", marginBottom: "0px"}} level={4}>Choose from your gallery</Title>
       <Text >Photos that already you uploaded</Text>
      <ul className='modal-profile-photos'>
      {isLoading &&  <SpinnerLoader/>}
           {!isLoading && 
             <>
               {data?.data?.map((img) => (
                <ImageToProfilePicture key={img._id} img={img} setImageUrl={setImageUrl} userId={userId}/>
              ))}
             </>
           }
      </ul>
      </Modal>
    </>
  )
}

export default ModalProfilePicture