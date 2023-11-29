import React from 'react'
import Navbar from '../../components/Navbar/componentNavbar/Navbar'

import CreatePost from '../../components/MIDDLE/crearPost/CreatePost'
import Feed from '../../components/MIDDLE/feed/Feed'



import FriendRequest from '../../components/RIGHT/FriendsRequest/FriendRequest'
import MessageBoxPage from '../messages/MessagesBoxPages'
import ConversationView from '../../components/RIGHT/messages/conversationView/ConversationView'

import Sidebar from '../../components/LEFT/Sidebar/Sidebar'
import UsersOnline from '../../components/RIGHT/messages/usersOnline/UsersOnline'



const Main = () => {
  


    return (
        <main>
            <Navbar></Navbar>
            <div className="container">
                {/* ===== LEFT ======= */}
                <div className="left">
                  <Sidebar/>
                </div>

                {/* ===== MIDDLE =====  */}
                <div className="middle">
                    <CreatePost />
                    <Feed type="PostsFeed" />
                </div>

                {/* ===== RIGHT =====  */}
                <div className="rightd">
                    <div className="messages">
                        
                        <ConversationView/>
                        
                    </div>
                    <div className="friendsRequest">
                        <FriendRequest />
                    </div>
                </div>
                <MessageBoxPage />
            </div>
        </main>
    )
}

export default Main