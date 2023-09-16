import React, {  useState } from 'react';
import './CreatePost.css';
import {  useSelector } from 'react-redux';
import rem from '../../../assets/rem.jpg';
import down from './icons/down.png'
import gallery from './icons/gallery.png'
import poll from './icons/poll.png'
import schedule from './icons/calendar.png'
import smile from './icons/smile.png'
import Votes from './Vote/Votes';
import  AutoComplete  from '../../Autocomplete/AutoComplete';




const CreatePost = () => {
  const { user } = useSelector((state) => state.user.currentUser);
  const [pollState, setPoll] = useState(false)
 

  
  const handleClick = (setState)=>{
    setState((prev)=>!prev)
  }

  return (
    <div className="container-createPost">
      <div className='info-createPost'>
        <div className='profile-photo'>
          <img src={rem} alt="" />
        </div>
        <div className='info-name'>
          <h2>{user.username}</h2>
          <div className='post-everyone'>
            <span>everyone</span>
            <img src={down} alt=""/>
          </div>
        </div>
        
      </div>

      <div className='input-createPost'>
        <AutoComplete placeholder={'Que estas pensando wey'} rows={4} cols={50}  />
     <Votes VotesActive={pollState} hideVotes={setPoll}/>


                           
      
     </div>

     

      <div className='divisor'></div>
      <div className='down-createPost'>
      <div className='options-createPost'>
        <img className='options-createPost-img' src={gallery} alt="" />
        <img className='options-createPost-img' src={poll} onClick={()=> handleClick(setPoll)} alt="" />
        <img className='options-createPost-img' src={smile}  alt="" />
        <img className='options-createPost-img' src={schedule} alt="" />
      </div>
      <div>
        <button className='button-post-createPost'>post</button>
      </div>
     </div>
      
    </div>
  );
};

export default CreatePost;
