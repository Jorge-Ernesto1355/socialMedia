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

function App() {


  return (
    <div>
      <Router>
        <Routes>
              <Route path='/signup' element={<Register />} />
              <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>

            {/* protect this routes */}
            <Route element={<PersitsLogin />}>
              <Route path="/profile/:userId/:postId" element={<Profile />} />
              <Route path="/favorites/:userId" element={<FavoritesList />}></Route>
              <Route path="/" element={<Main />} />
            </Route>


          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
