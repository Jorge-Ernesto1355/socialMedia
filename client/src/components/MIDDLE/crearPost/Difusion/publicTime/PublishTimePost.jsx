import {  Popover, Typography, TimePicker, Flex} from 'antd'
import dayjs from 'dayjs';
import React from 'react'
const format = 'HH:mm';
const { Text, Title} = Typography;

const PublishTimePost = () => {

    const content = (
     <div style={{margin: ".3rem"}}>
        <Title level={5} style={{marginBottom: "0"}}>Publish time</Title>
       <Flex vertical gap={10}>
        <Text> Time when post will be published</Text>
        <TimePicker defaultValue={dayjs('00:00', format)} format={format} />
       </Flex>
    </div>
    )


  return (
    <Popover trigger={"click"} content={content}>
            <div className='btn-colored'>
                <span style={{margin: '3px'}}>Publish time</span>
            </div>
    </Popover>
  )
}

export default PublishTimePost