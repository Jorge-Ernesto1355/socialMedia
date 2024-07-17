import { CameraOutlined,  UploadOutlined} from '@ant-design/icons';
import { Button, Divider, Flex, Modal,  Switch, Typography, Upload, message} from 'antd';
import React, { useState } from 'react'
import './modalEditFrontPage.css'
import PredeterminatesFrontPage from './predeterminatesFrontpage/PredeterminatesFrontPage';
import { getBase64 } from '../../modalProfilePicture/util/getBase64';
import CoverAndProfile from '../coverAndProfile/CoverAndProfile';


const { Text, Title} = Typography;
const ModalEditFrontPage = ({userId, user, isLoadingUser}) => {

    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const sizeAvatar = { xs: 24, sm: 32, md: 40, lg: 64, xl: 150, xxl: 150 }

    
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    

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
        

    const props = {
        onChange: handleChange,
        onPreview,
        block: true,
        name: 'coverPicture',
        action: `http://localhost:3001/api/v1/users/upload/coverPicture/${userId}`,
        showUploadList: false,
      };

    

    return (
      <>
       <Button  onClick={()=> showModal()} className='profile-frontPage-button-changeFront'><CameraOutlined/>Edit front page</Button>
        <Modal footer={null}  title={"Upload your front page"}  width={600} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='modal-frontPage'>
                    <CoverAndProfile isLoadingUser={isLoadingUser} style={{borderRadius:"1rem"}} user={user} imageUrl={imageUrl} sizeAvatar={sizeAvatar}/>
                </div>
                <Upload {...props}>
                    <Button loading={loading}  style={{marginTop: "100px", marginLeft: "130px"}} block={true} icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Divider plain>OR</Divider>
                <div style={{marginBottom: "20px"}}>
                <Title style={{marginTop:"20px", marginBottom: "0px"}} level={4}>choose one our predeterminates front pages</Title>
                <Text style={{marginBottom: "20px"}} >you will see the diference</Text>
                </div>
                <Flex gap={'small'} >
                    <Title level={5}>Show profile picture</Title>
                   <Switch defaultChecked  />
                </Flex>
                <PredeterminatesFrontPage setImageUrl={setImageUrl} userId={userId}/>
        </Modal>
      </>
    );
}

export default ModalEditFrontPage