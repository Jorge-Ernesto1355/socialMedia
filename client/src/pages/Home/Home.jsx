import React from "react";
import "./Home.css";
import Perfil from "../../components/LEFT/perfil/Perfil";
import Sidebar from "../../components/LEFT/Sidebar/Sidebar";
import CreatePost from "../../components/MIDDLE/crearPost/CreatePost";
import Feed from "../../components/MIDDLE/feed/Feed";
import Category from "../../components/RIGHT/Category/Category";
import FriendRequest from "../../components/RIGHT/FriendsRequest/FriendRequest";
import Message from "../../components/RIGHT/Messages/Message";
import SearchFriends from "../../components/RIGHT/SearchFriends/SearchFriends";
import Messages from "../../components/RIGHT/Message/Message";
import Navbar from "../../components/Navbar/componentNavbar/Navbar";

const Home = () => {
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
          <Feed />
        </div>

        {/* ===== RIGHT =====  */}
        <div className="right">
          <div className="messages">
            <SearchFriends />
            <Category />
            <Message />
            <Messages />
          </div>
          <div className="friendsRequest">
            <FriendRequest />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
