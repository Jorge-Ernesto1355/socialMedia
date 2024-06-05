import React from 'react'
import "./header.css"
import FrontPage from './FrontPage/FrontPage';
import Content from './content/Content';
import Footer from './Footer';


const Header = ({userId}) => {
  return (
    <div className="profile-card-container">

            <div className='profile-card'>
              <FrontPage userId={userId}></FrontPage>
              <Content userId={userId}></Content>
              <Footer></Footer>
            </div>
    
    </div>
  )
}

export default Header