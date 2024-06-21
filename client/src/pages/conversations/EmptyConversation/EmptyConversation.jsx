import { Button, Empty } from 'antd'
import React from 'react'
import "./EmptyConversation.css"
import Title from 'antd/es/typography/Title'

const EmptyConversation = () => {
  return (
    <Empty
    className='emptyConversation'
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 300,
    }}
    description={
      <Title level={5}>{"There's"} not any conversation selected, try to find more friends</Title>
    }
  >
    <Button type="primary">Know more friends</Button>
  </Empty>
  )
}

export default EmptyConversation