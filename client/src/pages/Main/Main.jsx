import React from 'react'
import Navbar from '../../components/Navbar/componentNavbar/Navbar'
import Perfil from '../../components/LEFT/perfil/Perfil'
import Sidebar from '../../components/LEFT/Sidebar/Sidebar'
import CreatePost from '../../components/MIDDLE/crearPost/CreatePost'
import Feed from '../../components/MIDDLE/feed/Feed'

import Category from '../../components/RIGHT/Category/Category'

import FriendRequest from '../../components/RIGHT/FriendsRequest/FriendRequest'
import MessageBoxPage from '../messages/MessagesBoxPages'
import ConversationView from '../../components/RIGHT/messages/conversationView/ConversationView'


const Main = () => {
    return (
        <main>
            <Navbar></Navbar>
            <div className="container">
                {/* ===== LEFT ======= */}
                <div className="left">
                  
                </div>

                {/* ===== MIDDLE =====  */}
                <div className="middle">
                    <CreatePost />
                    <Feed type="PostsFeed" />
                </div>

                {/* ===== RIGHT =====  */}
                <div className="rightd">
                    <div className="messages">
                        <Category />
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