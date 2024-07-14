import React  from "react";
import "./DetailsProfile.css";
import { useQuery } from "react-query";
import useUserRequest from "../../../hooks/auth/useUserRequest";
import UserService from "../../../services/UserService";
import { Button, Divider, Flex, Skeleton, Tag, Typography } from "antd";
import HomeIcon from "./icons/HomeIcon";
import PlaceMarker from "./icons/PlaceMarker";
import HearthIcon from "./icons/HearthIcon";
import { EditFilled } from "@ant-design/icons";
import ModalEditDetails from "./modalEditDetails/ModalEditDetails";
import WorkIcon from "./icons/WorkIcon";
import Skills from "../../skills/Skills";


const { Text, Title} = Typography;
const Details = ({userId}) => {

  const privateRequest = useUserRequest()
  const { data: user, isLoading, isError} = useQuery(["user", userId], () => UserService.getUser({ privateRequest, userId, options: ["bio", "interests"]}));

  

  return (
    <div className="detailsProfile-container">
         {
           isLoading && (
            <Flex vertical="columnn" gap={"large"}>
                <Skeleton/>
                <Skeleton/>
            </Flex>
          )
        }

        {!isLoading && (
          <>
                  <Title style={{marginBottom: "0"}} level={4}>Know more about {user?.username}</Title>
                <Text >you will see all about {user?.username}</Text>
                <Divider></Divider>
                <Title level={5}>Description</Title>
                <Text >{user?.bio}</Text>
                <Skills Skills={user?.interests} isError={isError} isLoading={isLoading}/>
                <br />
                <Title style={{marginBottom: "0"}} level={4}>More Information</Title>
                <Text >you will see more especific information like city, state</Text>
                <Divider></Divider>
                <Flex vertical="column" >
                  <Flex justify="start" align="center" gap={"large"}>
                      <HomeIcon/>
                      <Flex justify="" align="center" gap={"small"}>
                          <Text>lives in</Text>
                          <Title style={{marginBottom: "18px"}} level={5}>Mochicahui, Sinaloa, Mexico</Title>
                      </Flex>
                  </Flex>
                  <Flex justify="start" align="center" gap={"large"}>
                      <WorkIcon/>
                      <Flex justify="" align="center" gap={"small"}>
                          <Text>Work at</Text>
                          <Title style={{marginBottom: "18px"}} level={5}>Google Inc</Title>
                      </Flex>
                  </Flex>
                  <Flex justify="start" align="center" gap={"large"}>
                      <HearthIcon/>
                      <Flex justify="" align="center" gap={"small"}>
                         
                          <Title style={{marginBottom: "18px"}} level={5}>Soltero</Title>
                      </Flex>
                  </Flex>
                </Flex>
                <ModalEditDetails userId={userId}></ModalEditDetails>
          </>
        )}
        
    </div>
  );
};

export default Details;
