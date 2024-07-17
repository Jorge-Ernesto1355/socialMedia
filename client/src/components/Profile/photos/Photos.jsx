import React from "react";
import "./photos.css";

import UserService from "../../../services/UserService";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import { useCallbackRequest } from "../../../hooks/useCallbackRequest/useCallbackRequest";
import { Button, Flex, Image, Typography } from "antd";
import { SkeletonsSquare } from "../Loader/SkeletonSquare";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import ComponentStateHandler from "../../../hooks/stateManagmentComponent/ComponentStateHandler";
import InfiniteScroll from "react-infinite-scroll-component";
import BlurImageLoader from "../../../utilities/BlurImageLoader";

const { Text, Title} = Typography;
const Photos = ({ userId}) => {
 
 
  const privateRequest = useUserRequest()
  const { results, isLoading, isError,  hasNextPage, fetchNextPage, reset, refetch } =
  useInfiniteScroll({
    name: "posts",
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
        <InfiniteScroll
          dataLength={results.length}
          hasMore={hasNextPage || isLoading}
          loader={< SkeletonsSquare/>}
          next={() => fetchNextPage()}
        >
          <ComponentStateHandler isLoading={isLoading} isError={isError} Loader={<SkeletonsSquare/>} EmptyMessage={"no hay fotos"} ErrorMessageComponent={"error putos"} items={results}>
          <ul className="photos-body">
                  {results?.map((img, index) => (
                  <li  className={`photos-item${index}`} key={img?.public_id}>
                     <BlurImageLoader preview={img.previewUrl} divStyleClass={"imageProfile-blurImage-container"} image={img.url} notImage={false} alt={"posible image profile"}/>
                  </li>
                ))}
          </ul>
          </ComponentStateHandler>
    </InfiniteScroll>
       
      
        
    </div>
  );
};

export default Photos;




