import "./App.css";
import React from "react";

import { useSelector } from "react-redux";

import Profile from "./components/Profile/Profile";
import Perfil from "./components/LEFT/perfil/Perfil";
import Sidebar from "./components/LEFT/Sidebar/Sidebar";
import CreatePost from "./components/MIDDLE/crearPost/CreatePost";
import Feed from "./components/MIDDLE/feed/Feed";
import Messages from "./components/RIGHT/Messages/Message";
import SearchFriends from "./components/RIGHT/SearchFriends/SearchFriends";
import Category from "./components/RIGHT/Category/Category";
import Message from "./components/RIGHT/Message/Message";
import FriendRequest from "./components/RIGHT/FriendsRequest/FriendRequest";
import Navbar from "./components/Navbar/componentNavbar/Navbar";
import FavoritesList from "./components/favorites/FavoritesList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/profile/:userId/:postId" element={<Profile />} />
          <Route path="/favorites/:userId" element={<FavoritesList />}></Route>
          <Route path='/signup' element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            exact
            index
            element={

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
                      <Messages />
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

            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
