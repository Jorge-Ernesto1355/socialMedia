/* eslint-disable no-undef */

import './TimeExpiration.css'
import ArrowDown from '../../../../assets/caret.png'
import CreatePostStore from '../../../../zustand/CreatePostStore'


import { Popover, TimePicker } from 'antd'
import { formatTime } from './utils/formatTime'
import React from 'react'

const convertHoursToSeconds = (hours) => {
  return hours * 3600;
}

const TimeExpiration = () => {
  const { timeExpiration, setTimeExpiration } = CreatePostStore()


  const handleTimeExpiration = (time) =>{
    setTimeExpiration(time)
  }

  const onChange = (_ , timeString) => {
  const  [horas, minutos, segundos] = timeString?.split(':').map(Number) ?? 0
   const  totalSeconds = horas * 3600 + minutos * 60 + segundos;
   handleTimeExpiration(totalSeconds)
  };


  const content = (
   <React.Fragment>
    <h4>Time expiration</h4>
    <p className='text-muted' style={{fontSize:'x-small'}}>time of the post that will be on public</p>
    <h5>Default time</h5>
    <ul className='time-expiration-default-hours'>
          
    <li className='time-expiration-item'>
                <button className='expirePost-text' onClick={()=> handleTimeExpiration(convertHoursToSeconds(5))} >5 H</button>
            </li>
            <li className='time-expiration-item'>
                <button className='expirePost-text' onClick={()=> handleTimeExpiration(convertHoursToSeconds(12))} >12 H</button>
            </li>
            <li className='time-expiration-item' >
                <button className='expirePost-text' onClick={()=> handleTimeExpiration(convertHoursToSeconds(24))} >24 H</button>
            </li>
            <li className='time-expiration-item'>
                <button className='expirePost-text' onClick={()=> handleTimeExpiration(null)}>Always</button>
            </li>
          </ul>
      <h5>Custom time</h5>
      <TimePicker onChange={onChange} size='small' />
   </React.Fragment>
  )


  return (
    <React.Fragment>
    <Popover trigger={'click'} content={content}>
      <div className='btn-colored' >
        <span>{timeExpiration > 0 ?  formatTime(timeExpiration) : 'Always'}</span>
        <img src={ArrowDown} alt="time expiration" />
      </div>
    </Popover>
  </React.Fragment>
  )
}

export default TimeExpiration