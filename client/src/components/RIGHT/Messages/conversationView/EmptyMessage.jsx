import { Button, Empty } from 'antd'
import React from 'react'

const EmptyMessage = () => {
  return (
    
    <Empty description={<p className='text-muted'>Upps... try to connect with your people</p>}>
    <Button type='primary' size='default' >Connect</Button>
    </Empty>
    
  )
}

export default EmptyMessage