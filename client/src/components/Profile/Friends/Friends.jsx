import React from "react";
import "./Friends.css";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import UserService from "../../../services/UserService";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll/useInfiniteScroll";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Skeleton,  Button, Flex, Image, Typography } from "antd";
import { SkeletonsSquare } from "../Loader/SkeletonSquare";


const { Text, Title} = Typography ;
const Friends = ({ userId }) => {

  const privateRequest = useUserRequest()
  const { results, isLoading} =
    useInfiniteScroll({
      name: "friends",
      request: UserService.getFriends,
      privateRequest,
      id: userId
    })
   
   
  return (
    <div className="friends-container">
         <Flex justify="space-between" align="center" style={{marginBottom: "2rem"}}>
            <div>
              <Title level={4} style={{marginBottom: 0}}>Friends</Title>
              <Text>wath the recent frined</Text>
            </div>
            <Button type="link">
               Watch all friends
            </Button>
        </Flex>


        <ul className="photos-body">
        <div className="amigos-profile">
          {results.length === 0 && (
            <span className="without-friends text-muted">
              {"no hay amigos ;"}
            </span>
          )}
        
        {isLoading && <SkeletonsSquare/>}
        {!isLoading && (
          <>
            {results?.map((user, index) => (
                  <li key={user?._id} className={`photos-item${index}`}>
                    <Avatar shape="square" size={120} src={user?.imageProfile?.url} icon={user?.imageProfile?.url ?? <UserOutlined /> } />
                    <Title level={5}>{user?.username}</Title>
                  </li>
                ))}
         </>
     )}
    </div>
        </ul>

        


    </div>
  );
};

export default Friends;



 

