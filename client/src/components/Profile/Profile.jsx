import React from "react";
import "./Profile.css";
import { useParams } from "react-router-dom"

import Feed from "../MIDDLE/feed/Feed";
import Header from "./header/Header";
import profileProvider from "./ProfileProvider";
import Details from "./Details/Details";
import Photos from "./photos/Photos";
import Friends from "./Friends/Friends";
import UserService from "../../services/UserService";
import { objectFooterProfile } from "./header/Footer";
import StoriesProfile from "./storiesProfile/StoriesProfile";




const ProfileLayout = ({ userId, children }) => (
  <div className="Profile">
    <Header userId={userId} />
    <div className="body">
      <div className="left">
        <Details userId={userId} />
        <Photos userId={userId} />
        <Friends userId={userId} />
      </div>
      <div className="profile-right">
        {children}
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { tab } = profileProvider();
  const params = useParams();
  const userId = params.userId;

  const renderContent = () => {
    switch (tab) {
      case objectFooterProfile.usersPosts:
        return (
            <Feed userId={userId} service={UserService.getUserPosts} name={"usersPosts"} />
        );
      case objectFooterProfile.favorites:
        return (
          <Feed userId={userId} service={UserService.getFavoritesPosts} name={"favoritesPosts"} />
        );
      case objectFooterProfile.about:
        return (
          <>
            <Details userId={userId} />
            <Photos userId={userId} />
            <Friends userId={userId} />
          </> 
        );
        case objectFooterProfile.stories:
        return (
           <StoriesProfile userId={userId}/>
        );
        case objectFooterProfile.reactions:
          return (
             <Feed userId={userId} service={UserService.getPostsReaction} name={"reactedPosts"} />
          );
      // Puedes añadir más casos aquí para otras pestañas
      default:
        return <div>Default content</div>;
    }
  };

  return (
    <ProfileLayout userId={userId}>
      {renderContent()}
    </ProfileLayout>
  );
};

export default Profile;
