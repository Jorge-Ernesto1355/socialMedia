import React from "react";
import "./Sidebar.css";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import { useQuery } from "react-query";
import AuthProvider from "../../../zustand/AuthProvider";
import UserService from "../../../services/UserService";
import CoverAndProfile from "../../Profile/header/FrontPage/coverAndProfile/CoverAndProfile";
import {  Button,  Divider, Flex, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import Skills from "../../skills/Skills";


const { Text, Title} = Typography;
const Sidebar = () => {

  const {userId} = AuthProvider()
  const privateRequest = useUserRequest()
  const { data: user, isLoading: isLoadingUser, isError} = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId , options: ["coverPicture"]}));
  const sizeAvatar = { xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 120 }

  return (
  <aside className="sidebar-container">
    
      <Flex style={{width: "85%", height: "250px"}}>
          <CoverAndProfile isLoadingUser={isLoadingUser} user={user} style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}} sizeAvatar={sizeAvatar}/> 
      </Flex>
      <div className="sidebar-frontPage">

        {/** Header */}
          <Flex justify="space-between" align="center">
          <Flex style={{marginTop: '3rem', width: "100%"}}  vertical="column" justify="center" align="center">
            <Title level={4}>{user?.username}</Title>
            <Text type="secondary">{user?.email}</Text>
          </Flex>
         
          </Flex>
        {/** Header */}

          <Flex  vertical={"column"} justify="center" align="center" style={{marginTop: "1rem", width: "100%"}}>
          <Title level={5}>Bio</Title>
          <Flex  justify="center" align="center">
              <Text  type="secondary" style={{fontWeight: "500", textAlign:'center'}} >{!user?.bio ? "You haven't written anyting, write to the other people can know you" : user?.bio}</Text>
          </Flex>
          </Flex>
          <Divider></Divider>
          <Button style={{height: "2.5rem"}} type="primary" block>
           <Link to={`/profile/${userId}`} hrefLang="/profile/">My Profile</Link>
          </Button>
      </div>
      <br />
     <Skills isLoading={isLoadingUser} Skills={user?.interests} isError={isError}/>
    
  </aside>
   
  );
};

export default Sidebar;
