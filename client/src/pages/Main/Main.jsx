import React from 'react'
import Navbar from '../../components/Navbar/componentNavbar/Navbar'
import Perfil from '../../components/LEFT/perfil/Perfil'
import Sidebar from '../../components/LEFT/Sidebar/Sidebar'
import CreatePost from '../../components/MIDDLE/crearPost/CreatePost'
import Feed from '../../components/MIDDLE/feed/Feed'
import SearchFriends from '../../components/Profile/searchFriends/SearchFriends'
import Category from '../../components/RIGHT/Category/Category'
import Message from '../../components/RIGHT/Messages/Message'
import FriendRequest from '../../components/RIGHT/FriendsRequest/FriendRequest'

const Main = () => {
    return (
        <main>
            <Navbar></Navbar>
            <div className="container">
                {/* ===== LEFT ======= */}
                <div className="left">
                    <Perfil />
                    <Sidebar />
                </div>

                {/* ===== MIDDLE =====  */}
                <div className="middle">
                    <CreatePost />
                    <Feed type="PostsFeed" />
                </div>

                {/* ===== RIGHT =====  */}
                <div className="rightd">
                    <div className="messages">

                        <SearchFriends />
                        <Category />
                        <Message />
                    </div>

                    <div className="friendsRequest">
                        <FriendRequest />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main