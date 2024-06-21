import { EditFilled } from '@ant-design/icons';
import {  Button, Divider, Flex, Input, Modal, Skeleton, Typography, message } from 'antd';
import React, { useState } from 'react'
import { useGeoLocations } from '../../../../hooks/GeoLocation/useGeoLocations';
import { useMutation, useQuery } from 'react-query';
import UserService from '../../../../services/UserService';
import SelectCountry from './SelectCountry';
import SelectCity from './SelectCity';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
import useQueryLocation from '../../../../hooks/useQueryLocation';
const { Text, Title} = Typography;
const ModalEditDetails = ({userId}) => {


    const privateRequest = useUserRequest()
    const [isModalOpen, setIsModalOpen] = useState(false);
   

   const {isLoading, location, infoLocation, editInfoLocation} = useQueryLocation()
    
    const {mutate, isLoadingMutation} = useMutation({
        mutationFn: UserService.editUserLocation, 
        mutationKey: ["userLocation", userId],
        onSuccess: ()=> message.success("has beeen edited sucefully"), 
        onError: ()=> message.error("Something went wrong")

    })
    
    
    
   

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      mutate({location: {  city: infoLocation.city, 
        state: infoLocation.state, 
        country: infoLocation.country,
        workAt: infoLocation.workAt,},
        id: userId, 
        privateRequest
    })
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    <SelectCountry />
   
  return (
    <>
    <Button block type="primary" onClick={()=> showModal()}>
                 <EditFilled/>
                 Editar detalles        
     </Button>
    <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={isLoadingMutation} >
        <Title level={4} style={{marginBottom: '0'}}>Edit your details</Title>
        <Text>Edit your details if they are not put correctly</Text>
       <Divider/>
       <Flex vertical={"column"} gap={"large"}>
                <div>
                <Title level={5}>Country</Title>
                {isLoading ? <Skeleton.Input active={true} block/> : <SelectCountry country={location.country} handleInfoLocation={editInfoLocation} /> }
                </div>
                
                <div>
                <Title level={5}>City</Title>
                {isLoading ? <Skeleton.Input active={true} block/> : <SelectCity country={location.city} handleInfoLocation={editInfoLocation} /> }
                </div>

                <div>
    
                <Title level={5}>Work at</Title>
                <Input name='workAt' value={infoLocation.workAt}  placeholder='work at' onChange={(e)=> editInfoLocation({name: e.target.name, value: e.target.value})}/>
                </div>

                <Divider>Or</Divider>
                <Title level={5}>You can edit with wherever you want</Title>

                <Flex gap={"middle"}>
                    <Flex vertical="column">
                            <Text>City</Text>
                            <Input value={infoLocation.city === ""  ? location.city :  infoLocation.city} name='city' placeholder='city'  onChange={(e)=> editInfoLocation({name: e.target.name, value: e.target.value})}/>
                    </Flex>
                    <Flex vertical="column">
                            <Text>State</Text>
                            <Input value={infoLocation.state === ""  ? location.state :  infoLocation.state}  name='state' placeholder='state' onChange={(e)=> editInfoLocation({name: e.target.name, value: e.target.value})}/>
                    </Flex>
                    <Flex vertical="column">
                            <Text>Country</Text>
                            <Input value={infoLocation.country === ""  ? location.country :  infoLocation.country} name='country' placeholder='country' onChange={(e)=> editInfoLocation({name: e.target.name, value: e.target.value})}/>
                    </Flex>
                </Flex>
       </Flex>
    </Modal>
  </>
  )
}

export default ModalEditDetails