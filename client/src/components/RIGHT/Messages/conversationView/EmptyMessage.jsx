import { Button, Empty, Flex, Typography } from 'antd'
import React from 'react'
import UserMaybeKnow from '../../../userMaybeKnow/UserMaybeKnow'
const { Text, Title} = Typography;
const description = (
  <>
  <Flex style={{width: "100%"}}>
    <Text style={{width: "100%"}} type='secondary'>
      <Flex justify='center' gap={5}>
      Upps... try to 
          <UserMaybeKnow>
              <p style={{color: "var(--color-blue)", cursor: "pointer"}}>connect</p>
           </UserMaybeKnow>
       with your people 
      </Flex>
    </Text>
  </Flex>
  </>
)

const EmptyMessage = () => {
  return (
    
    <Empty description={description}/>

   
    
  )
}

export default EmptyMessage