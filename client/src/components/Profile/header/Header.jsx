import React from 'react'
import "./header.css"
import FrontPage from './FrontPage/FrontPage';
import Content from './content/Content';
import Footer from './Footer';
import UserService from '../../../services/UserService';
import { useQuery } from 'react-query';


const Header = ({userId}) => {


  
  return (
    <div className="profile-card-container">
            <div className='profile-card'>
              <FrontPage userId={userId}/>
              <Content userId={userId}/>
              <Footer userId={userId}/>
            </div>
    
    </div>
  )
}

export default Header