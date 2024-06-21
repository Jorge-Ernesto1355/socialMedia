import React  from "react";
import "./Profile.css";
import { useParams } from "react-router-dom"
import CrearPost from "../MIDDLE/crearPost/CreatePost";
import Feed from "../MIDDLE/feed/Feed";
import Header from "./header/Header";
import profileProvider from "./ProfileProvider";
import Details from "./Details/Details";
import Photos from "./photos/Photos";
import Friends from "./Friends/Friends";


const Profile = () => {

  const {tab} = profileProvider()
  const params = useParams();
  const userId = params.userId;

  return (
    <div className="Profile">
     <Header userId={userId}/>

      <div className="body">
        <div className="left">
           <div>
              <Details userId={userId} />
              <Photos userId={userId}/>
              <Friends userId={userId}/>
            </div>
        </div>
        <div className="profile-right">
        {tab === 1 ? (
              <>
                <CrearPost />
                <Feed  type={"userPosts"} />
              </>
            ) : 
            (
              <>hola</>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
