import { EditFilled } from '@ant-design/icons';
import {  Button, Divider, Flex, Input, Modal, Skeleton, Typography, message } from 'antd';
import React, { useState } from 'react'
import { useGeoLocations } from '../../../../hooks/GeoLocation/useGeoLocations';
import { useMutation, useQuery } from 'react-query';
import UserService from '../../../../services/UserService';
import SelectCountry from './SelectCountry';
import SelectCity from './SelectCity';
import useUserRequest from '../../../../hooks/auth/useUserRequest';
const { Text, Title} = Typography;
const ModalEditDetails = ({userId}) => {


    const privateRequest = useUserRequest()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [location, setLocation] = useState({})
    const LonLat = useGeoLocations()
    const [infoLocation, setInfoLocation] = useState({
        city: "", 
        state: "", 
        country: "", 
        workAt: ""
    })

    const {isLoading} = useQuery(["userLocation", userId], async  ()=> UserService.getUserLocation({latitude:LonLat?.location?.latitude, longitude: LonLat?.location?.longitude}), {
        onSuccess: (data)=>{
            if(!data) return null
            if(!data?.status === "200") return null
            
            
            const userLocation = {
                countryCode: data.data?.results[0]?.components?.country_code, 
                country: data.data?.results[0]?.components?.country, 
                city: data.data?.results[0]?.components?.county, 
                state: data.data?.results[0]?.components?.state, 
            } 
            setLocation(userLocation)
        }, 
        enabled: !!LonLat.location.latitude && !!LonLat.location.longitude
    })
    
    const {mutate, isLoadingMutation} = useMutation({
        mutationFn: UserService.editUserLocation, 
        mutationKey: ["userLocation", userId],
        onSuccess: ()=> message.success("has beeen edited sucefully"), 
        onError: ()=> message.error("Something went wrong")

    })
    
    
    
    const handleInfoLocation = ({name, value})=>{
        setInfoLocation((prev)=> {
            return {...prev, [name]: value}
        })
    }

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
                {isLoading ? <Skeleton.Input active={true} block/> : <SelectCountry country={location.country} handleInfoLocation={handleInfoLocation} /> }
                </div>
                
                <div>
                <Title level={5}>City</Title>
                {isLoading ? <Skeleton.Input active={true} block/> : <SelectCity country={location.city} handleInfoLocation={handleInfoLocation} /> }
                </div>

                <div>
    
                <Title level={5}>Work at</Title>
                <Input name='workAt' value={infoLocation.workAt}  placeholder='work at' onChange={(e)=> handleInfoLocation({name: e.target.name, value: e.target.value})}/>
                </div>

                <Divider>Or</Divider>
                <Title level={5}>You can edit with wherever you want</Title>

                <Flex gap={"middle"}>
                    <Flex vertical="column">
                            <Text>City</Text>
                            <Input value={infoLocation.city === ""  ? location.city :  infoLocation.city} name='city' placeholder='city'  onChange={(e)=> handleInfoLocation({name: e.target.name, value: e.target.value})}/>
                    </Flex>
                    <Flex vertical="column">
                            <Text>State</Text>
                            <Input value={infoLocation.state === ""  ? location.state :  infoLocation.state}  name='state' placeholder='state' onChange={(e)=> handleInfoLocation({name: e.target.name, value: e.target.value})}/>
                    </Flex>
                    <Flex vertical="column">
                            <Text>Country</Text>
                            <Input value={infoLocation.country === ""  ? location.country :  infoLocation.country} name='country' placeholder='country' onChange={(e)=> handleInfoLocation({name: e.target.name, value: e.target.value})}/>
                    </Flex>
                </Flex>
       </Flex>
    </Modal>
  </>
  )
}

export default ModalEditDetails