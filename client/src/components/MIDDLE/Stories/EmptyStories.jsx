import { Button, Flex, Typography } from 'antd'
import React from 'react'
import UserMaybeKnow from '../../userMaybeKnow/UserMaybeKnow';

const { Text, Title} = Typography;
const EmptyStories = () => {
  return (
    <Flex style={{width:"100%", height: "100%"}} justify='center' align='center' vertical gap={10}>
            <Title level={3} style={{marginBottom: '0'}} >No Stories</Title>
            <Title level={5}>Nobody of your friends has uploaded a story, try to know more friends </Title>
            
            <UserMaybeKnow>
              <Button type='primary'>Know more people</Button>
            </UserMaybeKnow>
    </Flex>
  )
}

export default EmptyStories