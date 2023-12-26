/* eslint-disable no-undef */

import './TimeExpiration.css'
import ArrowDown from '../../../../assets/caret.png'
import CreatePostStore from '../../../../zustand/CreatePostStore'
import Popover from '../../../../hooks/Popover/Popover'
import watch from './icons/watch.png'


const TimeExpiration = () => {
  const { timeExpiration, setTimeExpiration } = CreatePostStore()


  const handleTimeExpiration = (time) =>{
    setTimeExpiration(time)
  }


  const handleHour = (seconds)=>{
    const hours = Math.floor(seconds / 3600)
    return hours + ' horas'
  }


  return (
    <div >
      <Popover trigger={<div className='difusion-container' >
        <span>{timeExpiration > 0 ?  handleHour(timeExpiration) : 'Always'}</span>
        <img src={ArrowDown} alt="time expiration" />
      </div>}>
          <ul className='expirePost-container'>
          <li className='expirePost-item'>
               <img src={watch} alt="expire time" className='expirePost-time' />
            </li>
            <li className='expirePost-item'>
                <p className='expirePost-text' onClick={()=> handleTimeExpiration(18000)} >5 Horas</p>
            </li>
            <li className='expirePost-item'>
                <p className='expirePost-text' onClick={()=> handleTimeExpiration(43200)} >12 Horas</p>
            </li>
            <li className='expirePost-item' >
                <p className='expirePost-text' onClick={()=> handleTimeExpiration(86400)} >24 Horas</p>
            </li>
            <li className='expirePost-item'>
                <p className='expirePost-text' onClick={()=> handleTimeExpiration()}>Always</p>
            </li>
            
          </ul>
        </Popover>
      
    </div>
  )
}

export default TimeExpiration