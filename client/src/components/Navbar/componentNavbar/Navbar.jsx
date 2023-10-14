import "./Navbar.css";

// librerias
import React from "react";
import rem from "../../../assets/rem.jpg";
import Search from "../Search/Search";
import useLogOut from "../../../hooks/auth/useLogOut";
import AuthProvider from "../../../zustand/AuthProvider";
import { useNavigate } from "react-router-dom";


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


  return (
    <nav>
      <div className="container">
        <h2 className="log">cbta 81</h2>
        <Search />

        
        <div className="create">
          <div className="profile-photo">
            <img src={rem} alt="" />
          </div>

        </div>
        <button onClick={() => signOut()}>sign out</button>
      </div>
    </nav>
  );
};

export default Navbar;
