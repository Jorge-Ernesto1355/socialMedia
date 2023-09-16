import React, { useState } from 'react';
import './Profile.css';

import { useParams } from 'react-router-dom';
import montaña from '../../assets/img.jpg';
import heart from '../../assets/couple.png';
import rem from '../../assets/rem.jpg';
import edit from '../../assets/edit.png';
import photo from '../../assets/photos.png';
import { UserAdapterSucces, FailureAdapter } from './useAdapter';
import camera from '../../assets/camara-reflex-digital.png';

//components
import Detalles from './Detalles/Detalles';
import Fotos from './Fotos/Fotos';
import Amigos from './Amigos/Amigos';
import CrearPost from '../MIDDLE/crearPost/CreatePost';
import Feed from '../MIDDLE/feed/Feed';
import GetUser from '../../services/GetUser.service';
import Skeleton from '../Skeleton/Skeleton';
import { useEffect } from 'react';
import EditProfile from './editProfile/EditProfile';

const Profile = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const details = {
    living: 'ciudad de mexico pa',
    location: 'en mochicahui padrino',
    single: 'claro que si',
    hobbies: 'me gusta jugar '
  };
  const params = useParams();
  const userId = params.userId;
  const postId = params.postId;

  useEffect(() => {
    const getUserById = async () => {
      setIsLoading(true);
      const { data, error } = await GetUser(userId);

      if (error === null) {
        setUser(data?.data && UserAdapterSucces(data?.data));
      } else {
        setUser(FailureAdapter());
      }

      setIsLoading(false);
    };
    getUserById();
  }, [userId]);

  return (
    <div className="Profile">
      <div className="card">
        <div className="head">
          <div className="portada">
            <img src={montaña} alt="" />
            <div className="addFrontPage">
              <img src={photo} alt="" />
              <h5 onClick={() => setShowEdit(true)}>anadir foto de portada</h5>
            </div>
          </div>
          <div className="head-down">
            <div className="left">
              <div className="add-profile">
                <img
                  onClick={() => setShowEdit(true)}
                  className=""
                  src={camera}
                  alt=""
                />
              </div>
              <div className="profile-photo">
                <img src={rem} alt="" />
              </div>
              <div className="info">
                <h2>{user?.username ? user?.username : 'sin nombre'}</h2>
                <span className="text-muted">2.4 mil amigos</span>
                <div className="profiles-Friends">
                  {user?.friends?.length === 0 ? (
                    <div>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    user?.friends?.map((img) => (
                      <span>
                        <img src={img?.image?.url} alt="" />
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="righe">
              <div className="create">
                <div className="postt">Publicar</div>
                <div className="edit">
                  <img src={edit} alt="" />
                  <h5 onClick={() => setShowEdit(true)}> Editar perfil</h5>
                </div>
              </div>
              <div className="couple">
                <h4>Parejas</h4>
                <div className="couples">
                  <div className="profile-photo">
                    <img className="img" src={rem} alt="" />
                  </div>
                  <img className="heart" src={heart} alt="" />
                  <div className="profile-photo">
                    <img className="img" src={rem} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfile showEdit={showEdit} user={user} hideEdit={setShowEdit} />
      <div className="body">
        <div className="left">
          {isLoading ? (
            <Skeleton type={'custom'} />
          ) : (
            <div>
              <Detalles user={user} details={details} />
              <Fotos user={user} />
              <Amigos user={user} />
            </div>
          )}
        </div>
        <div className="">
          <CrearPost user={user} />
          <Feed userId={user._id} type={'userPosts'} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
