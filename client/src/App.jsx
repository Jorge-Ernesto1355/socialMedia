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
import Login from "./pages/Login/components/Login";
import Settings from "./components/settings/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme from "./components/Theme/Theme";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/profile/:userId/:postId" element={<Profile />} />
          <Route path="/favorites/:userId" element={<FavoritesList />}></Route>
          <Route
            exact
            index
            element={
              currentUser ? (
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
                      <Theme />
                      <Settings></Settings>
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
              ) : (
                <Login />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
