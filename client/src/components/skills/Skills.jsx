import { Button, Flex, Skeleton, Tag, Typography } from 'antd'
import React from 'react'
import ComponentStateHandler from '../../hooks/stateManagmentComponent/ComponentStateHandler'
import { Link } from 'react-router-dom';
import AuthProvider from '../../zustand/AuthProvider';
import ModalSetSkills from './ModalSetSkills';


const SkeletonSkills = (
    <>
       <Flex gap={20}>
            <Skeleton.Button></Skeleton.Button>
            <Skeleton.Button></Skeleton.Button>
            <Skeleton.Button></Skeleton.Button>
            <Skeleton.Button></Skeleton.Button>
       </Flex>
    </>
)

const { Text, Title} = Typography;

const Skills = ({Skills = [], isLoading, isError}) => {
  const {userId} = AuthProvider()

  return (
    <> 
      <Title level={3}>
        Skills
      </Title>
        <ComponentStateHandler
         isLoading={isLoading}
         isError={isError}
         items={Skills}
         Loader={SkeletonSkills}
         ErrorMessageComponent={<Text type='danger'>Upps, something went wrong, try to comunicate with our or reload</Text>}
         EmptyMessage={<Text type='secondary'>Search your passions, and find people with the same passions like you <ModalSetSkills><Button type='link'>Set skills</Button></ModalSetSkills></Text>}
         >
            
            {Skills?.map((tag)=> (
                    <Tag className="sidebar-tag" key={tag}>
                    <Text>{tag}</Text>
                    </Tag>
             ))}
        </ComponentStateHandler>
    
     </>
  )
}

export default Skills