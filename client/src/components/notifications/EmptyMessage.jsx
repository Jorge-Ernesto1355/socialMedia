import { Button, Empty } from 'antd'
import React from 'react'

const EmptyMessage = () => {
  return (
    <Empty
    style={{display:'grid', placeContent:'center'}}
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 100, width:160 }}
    description={
      <span>
        Not Notifications 
      </span>
    }
  >
    <Button type="primary">Meet people</Button>
  </Empty>
  )
}

export default EmptyMessage