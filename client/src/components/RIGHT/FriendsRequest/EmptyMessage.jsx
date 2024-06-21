import { Button, Empty } from 'antd'
import React from 'react'
import UserMaybeKnow from '../../userMaybeKnow/UserMaybeKnow'

const EmptyMessage = () => {
  return (
    <Empty style={{padding: "10px", marginBlock: 0}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p className='text-muted'>Upps... why not meet the friends of your friends</p>} >
        <UserMaybeKnow>
          <Button type='primary'>Suguested people</Button>
        </UserMaybeKnow>
    </Empty>
  )
}

export default EmptyMessage