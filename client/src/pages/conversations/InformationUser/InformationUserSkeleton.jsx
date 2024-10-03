import { Divider, Flex } from 'antd'
import React from 'react'
import Skeleton from '../../../components/Skeleton/Skeleton'

const InformationUserSkeleton = () => {
    
        <Flex vertical align="center" style={{ width: "100%" }}>
          <Skeleton.Avatar active size={80} style={{ marginBottom: '16px' }} />
          <Skeleton.Input active size="small" style={{ width: 150, marginBottom: '8px' }} />
          <Skeleton.Input active size="small" style={{ width: 200, marginBottom: '16px' }} />
          <Skeleton.Input active size="small" style={{ width: '80%', marginBottom: '16px' }} />
          <Divider />
          <Skeleton.Input active size="small" style={{ width: '90%', marginBottom: '16px' }} />
          <Skeleton.Input active size="small" style={{ width: '90%', marginBottom: '16px' }} />
          <Skeleton.Input active size="small" style={{ width: '90%', marginBottom: '16px' }} />
          <Skeleton.Input active size="small" style={{ width: 100, marginBottom: '16px' }} />
          <Flex gap={8}>
            <Skeleton.Button active size="small" />
            <Skeleton.Button active size="small" />
            <Skeleton.Button active size="small" />
          </Flex>
        </Flex>
      
}

export default InformationUserSkeleton