import { Button, Empty } from 'antd'
import React from 'react'

const EmptyMessage = () => {
  return (
    <Empty  image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p className='text-muted'>Upps... why not meet the friends of your friends</p>} >
        <Button type='primary'>Suguested people</Button>

    </Empty>
  )
}

export default EmptyMessage