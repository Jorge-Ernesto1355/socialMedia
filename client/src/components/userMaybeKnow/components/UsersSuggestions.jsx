import React, { useState } from 'react'
import './userSuggestions.css'
import { Empty, Flex, Segmented, Typography } from 'antd';
import UserSuggestion from './UserSuggestion';
import AliceCarousel from 'react-alice-carousel';
import UserService from '../../../services/UserService';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll/useInfiniteScroll';
import AuthProvider from '../../../zustand/AuthProvider';
import useUserRequest from '../../../hooks/auth/useUserRequest';
import { useGeoLocations } from '../../../hooks/GeoLocation/useGeoLocations';
import LoaderStories from '../../MIDDLE/Stories/LoaderStories/LoaderStories';
import EmptyMessage from '../EmptyMessage';
import InfiniteScroll from 'react-infinite-scroll-component'
const { Text} = Typography;
const UsersSuggestions = () => {

    const {userId} = AuthProvider()
    const privateRequest = useUserRequest()
    const lonLat = useGeoLocations()
    const typeUsersSuggestions = Object.freeze({
        nearby: {label: "Nearby", message: "They are users that are nearby from you, for example 20km", service: UserService.getNearbyUsers}, 
        usersFromFriends: {label: 'Relationated friends', message: "They are users of your friends", service: UserService.getUserFromFriends},
        commonInterests: {label: "Common interests", message: "They are users that also have the same interest of you", service: UserService.getUsersWithCommonInterests}
    })

    const [typeSelected, setTypeSelected] = useState(typeUsersSuggestions.nearby)

    const {results, isError, isLoading,  hasNextPage, fetchNextPage} = useInfiniteScroll({
        request: typeSelected?.service,
         name: typeSelected?.label,
         id: userId,
         privateRequest, 
         dataToSend: {lng: lonLat.location.longitude, lat: lonLat.location.latitude},
         enabledSettings: !!lonLat.location.latitude && !! lonLat.location.longitude
        })


    const options = Object.values(typeUsersSuggestions).map(type => ({
        label: type.label,
        value: type.label
      }));
    
      const handleChange = (value) => {
        const selectedType = Object.values(typeUsersSuggestions).find(type => type.label === value);
        setTypeSelected(selectedType);
      };


      const responsive = {
        0: { items: 1 },
        368: { items: 2 },
        424: { items: 3 },
    };

    const items = results.map((user)=>(
        <UserSuggestion key={user?._id} user={user}/>
    ))



  return (
    <div>
   <Flex vertical gap={5}>
   <Segmented
        style={{width: "50%"}}
        options={options}
        onChange={handleChange}
    />
     <Text type='secondary' >{typeSelected.message}</Text>
   </Flex>

    <Flex style={{marginTop: "2rem"}}>
        
   {results.length <= 0 && (
     <Flex style={{width: "100%"}} justify='center'>
       {!isError &&  <Empty/>}
       {!!isError && <Text type='danger'>Upps something went wrong</Text> }
     </Flex>
   )}
    
      {results.length > 0 && (
        <>
          {!isLoading && (
            <div
              id="scrollableDiv"
              style={{
                width: '100%',
                height: 300,
                overflowX: 'auto',
                display: 'flex',
                overflowY: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              <InfiniteScroll
                dataLength={results.length}
                hasMore={hasNextPage}
                next={fetchNextPage}
                loader={<LoaderStories />}
                scrollableTarget="scrollableDiv"
                style={{ display: 'flex', overflowX: 'hidden' }}
              >
                <div style={{ display: 'flex' }}>
                  {items.map((item, index) => (
                    <div key={index} style={{ display: 'inline-block' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </>
      )}
    
    </Flex>
    
    </div>
  )
}

export default UsersSuggestions