import React from "react";
import "./photos.css";

import UserService from "../../../services/UserService";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import { useCallbackRequest } from "../../../hooks/useCallbackRequest/useCallbackRequest";
import { Button, Flex, Image, Typography } from "antd";
import { SkeletonsSquare } from "../Loader/SkeletonSquare";

const { Text, Title} = Typography;
const Photos = ({ userId}) => {
 
 
const privateRequest = useUserRequest()
  const { data, isLoading, isError} =
    useCallbackRequest({
      name: "photos",
      request: UserService.getPhotos,
      privateRequest,
      id: userId
    });


    
   
    

  return (
    <div className="photos-container">
        <Flex justify="space-between" align="center" style={{marginBottom: "2rem"}}>
            <div>
              <Title level={4} style={{marginBottom: 0}}>Photos</Title>
              <Text>photos are the newest</Text>
            </div>
            <Button type="link">
               See all photos
            </Button>
        </Flex>
        <ul className="photos-body">
            
             {isLoading &&  <SkeletonsSquare/>}
           {!isLoading && 
             <>
               {data?.data?.map((img, index) => (
                <li  className={`photos-item${index}`} key={img?.public_id}>
                  <Image
                  style={{width: "100%", height: "100%"}}
                  wrapperClassName="wrapper-photo"
                  className={"photos-item-img"}
                  src={img?.url}
                />
                </li>
              ))}
             </>
           }
        </ul>
        
    </div>
  );
};

export default Photos;




