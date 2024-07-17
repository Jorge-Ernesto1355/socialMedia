import { Modal, Typography } from 'antd';
import React, { useState } from 'react'
import CustomizedFeed from '../MIDDLE/feed/customizedFeed/CustomizedFeed';
const { Text, Title} = Typography;

const ModalSetSkills = ({children}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    if(!React.isValidElement(children)) return <Text>Ups, something went wrong</Text>

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  return (
    
 <>
      {React.cloneElement(children, {onClick: ()=> showModal()})}
      <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}  styles={{ content: { padding: "0px", background: "none" } }}>
        <CustomizedFeed/>
      </Modal>
    </>
    
  )
}

export default ModalSetSkills