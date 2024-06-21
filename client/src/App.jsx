import "./App.css";
import React from "react";



import Profile from "./components/Profile/Profile";

import FavoritesList from "./components/favorites/FavoritesList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Layout from "./components/layout/Layout";
import PersitsLogin from "./utilities/auth/PersitsLogin";
import Room from "./components/Room";
import ConversationsPage from "./pages/conversations/ConversationsPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import Requests from "./pages/request/Requests";

function App() {

  


  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/room/:roomId" element={<Room />}/>
          <Route path="/" element={<Layout />}>
            {/* protect this routes */}
            <Route element={<PersitsLogin />}>
              <Route path="/notifications/:userId" element={<NotificationsPage />} />
              <Route path="/conversations/:userId" element={<ConversationsPage />} />
              <Route path="/friends/:userId" element={<Requests/>}/> 
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/favorites/:userId" element={<FavoritesList />}></Route>
              <Route path="/" element={<Main />} />
            </Route>


          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
