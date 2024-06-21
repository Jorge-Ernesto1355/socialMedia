import { Button, Modal, Typography } from 'antd';
import React, { useState } from 'react'
import UsersSuggestions from './components/UsersSuggestions';
const { Text, Title} = Typography;
const UserMaybeKnow = ({children}) => {


    if(!React.isValidElement(children)) return <Text>Ups, something went wrong</Text>

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Modal title="People you maybe know" width={900} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
           <UsersSuggestions/>
        </Modal>
    </>
  )
}

export default UserMaybeKnow