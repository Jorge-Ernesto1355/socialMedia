import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover, Typography } from 'antd';
import React from 'react'

const { Text} = Typography;
const InfoTimeExpiration = () => {

    const content = (
        <Text>
            The time that the post will be shown to your friends
        </Text>
    )
  return (
    <Popover trigger={"click"} content={content}>
            <InfoCircleOutlined />
    </Popover>
  )
}

export default InfoTimeExpiration