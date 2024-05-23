import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import CreatePost from '../../components/MIDDLE/crearPost/CreatePost'
import Feed from '../../components/MIDDLE/feed/Feed'

import FriendRequest from '../../components/RIGHT/FriendsRequest/FriendRequest'
import MessageBoxPage from '../messages/MessagesBoxPages'
import ConversationView from '../../components/RIGHT/Messages/conversationView/ConversationView'

import Sidebar from '../../components/LEFT/Sidebar/Sidebar'
import WithSearch from '../../HOCs/WithSearch'





const Main = () => {
  
    const ConversationViewWithSearch = WithSearch(ConversationView, {INDEX_NAME:'conversations'})
    

    return (
        <main>
            <Navbar/>
            <section className="container">
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
                        
                        <ConversationViewWithSearch title="Message"/>
                        
                    </div>
                    <div className="friendsRequest">
                        <FriendRequest />
                    </div>
                </div>
                <MessageBoxPage />
            </section>
        </main>
    )
}

export default Main