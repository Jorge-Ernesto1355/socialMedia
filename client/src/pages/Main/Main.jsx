import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import CreatePost from '../../components/MIDDLE/crearPost/CreatePost'
import Feed from '../../components/MIDDLE/feed/Feed'

import FriendRequest from '../../components/RIGHT/FriendsRequest/FriendRequest'
import MessageBoxPage from '../messages/MessagesBoxPages'
import ConversationView from '../../components/RIGHT/Messages/conversationView/ConversationView'

import Sidebar from '../../components/LEFT/Sidebar/Sidebar'
import WithSearch from '../../HOCs/WithSearch'
import Stories from '../../components/MIDDLE/Stories/Stories'
import useWindowWidth from '../../hooks/useWindowWidth'
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile'
import PostServices from '../../components/MIDDLE/post/services/PostServices'
import AuthProvider from '../../zustand/AuthProvider'





const Main = () => {
  
    const ConversationViewWithSearch = WithSearch(ConversationView, {INDEX_NAME:'conversations'})
    const userId = AuthProvider((store)=> store.userId)


    return (
        <main className='main '>
            <Navbar/>
            <section className="container">
                {/* ===== LEFT ======= */}
                <div className="left">
                  <Sidebar/>
                </div>

                {/* ===== MIDDLE =====  */}
                <div className="middle">
                    <Stories/>
                    <CreatePost />
                    <Feed userId={userId} type="PostsFeed" service={PostServices.getTimeLine} name="posts"/>
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
                <NavbarMobile/>
        </main>
    )
}

export default Main