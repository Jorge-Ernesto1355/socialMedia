import { Col, Row, Skeleton } from 'antd'
import React from 'react'

const LoaderStories = () => {
  return (

    <Row>
        <Col span={6}>
           <Skeleton.Avatar active={true} size={38} shape={"square"} style={{width: "150px", height: '258px', borderRadius: "1rem", }} />
        </Col>
        <Col span={6}>
           <Skeleton.Avatar active={true} size={40} shape={"square"} style={{width: "150px", height: '258px', borderRadius: "1rem", marginLeft: ".3rem"}} />
        </Col>
        <Col span={6}>
           <Skeleton.Avatar active={true} size={40} shape={"square"} style={{width: "150px", height: '258px', borderRadius: "1rem", marginLeft: ".5rem"}} />
        </Col>
        <Col span={6}>
           <Skeleton.Avatar active={true} size={40} shape={"square"} style={{width: "150px", height: '258px', borderRadius: "1rem", marginLeft: ".7rem"}} />
        </Col>
    </Row>
    
  )
}

export default LoaderStories