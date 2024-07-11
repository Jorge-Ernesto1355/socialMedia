import { Tag, Typography } from 'antd';
import React from 'react'
import { interests } from '../utils/interests';
const { Text, Title} = Typography;
const InterestsAndSkills = ({handleAddKills}) => {

    
  return (
    <div>
        {interests.map((item)=>(
            <div key={item.id} style={{marginTop: "1rem"}} >
                <Title level={5}>{item.name}</Title>
                {item.suggestions.map((skill, index)=> (
                    <Tag bordered={false}  className='tag-skill' key={index} onClick={()=> handleAddKills(skill)}>
                    {skill}
                </Tag>
            ))}                      
            </div>
        ))}
    </div>
  )
}

export default InterestsAndSkills