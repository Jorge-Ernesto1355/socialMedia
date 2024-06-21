import "./Navbar.css";

// librerias
import React from "react";
import rem from "../../assets/rem.jpg";
import Search from "./Search/Search";
import useLogOut from "../../hooks/auth/useLogOut";
import AuthProvider from "../../zustand/AuthProvider";
import { useNavigate } from "react-router-dom";
import WithSearch from "../../HOCs/WithSearch";
import MessengerIcon from "./messengericon/MessengerIcon";
import Image from "../../utilities/Image";
import NotificationIcon from "./notificationIcon/NotificationIcon";
import MenuIcon from "./menuIcon/MenuIcon";
import { Avatar } from "antd";
import Title from "antd/es/typography/Title";



const Navbar = () => {

  const Auth = AuthProvider()
  const { mutateSignOut } = useLogOut()
  const navigate = useNavigate()

  const signOut = () => {
    const refresh = Auth.getRefreshToken()

    mutateSignOut(refresh, {
      onSuccess: () => {
        Auth.setAccessToken(null)
        Auth.setRefreshToken(null)
        Auth.logout()
        navigate('/login')
      }
    })
  }

  const SearchHoc = WithSearch(Search, {INDEX_NAME:'users'})



  return (
    <nav>
      <div className="container">
        <Title className="navbar-title" level={3} style={{fontWeight: "bold", color: "#4098FF", marginBottom: 0}} > UniVerse </Title>
        <SearchHoc/>
        
        <div className="actions-navbar">
        <MenuIcon/>
        <MessengerIcon/>
        <NotificationIcon/>
       
       
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
