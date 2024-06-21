import React from 'react'
import './ErrroPost.css'
import ErrorButton from '../../comments/makeComment/styledComponentes/ErrorButton/ErrorButton'
import warning from '../../../../deleteComponent/icons/triangle-warning.png'
import { Typography } from 'antd';
const { Text, Title} = Typography;
const ErrorPost = ({reset}) => {
  return (
    <div className='errorPost-container'>
        <div>
        <div>
                <div className='circle-red'>
                    <img className='triangule-warning' src={warning} alt="" />
                </div>
            </div>
        </div>

        <Title level={4}>Upss... Something went wrong</Title>
        <Text type='secondary'>try to reload the page to fix it</Text>
       <div className='reset-button'>
       <ErrorButton reset={reset}/>
       </div>
    </div>
  )
}

export default ErrorPost