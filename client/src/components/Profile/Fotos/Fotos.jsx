import React, { useEffect, useState } from 'react';
import './Fotos.css';

import FindAllUserPost from '../../../services/FindAllUserPost';
import Slider from '../slider/Slider';

const Fotos = ({ user }) => {
  const [PhotoActive, setPhotoActive] = useState(false);
  const [posts, setPosts] = useState([]);
  let photos = [];

  function filtrarPorID(obj) {
    if ('image' in obj && typeof obj.image === 'object') {
      return true;
    } else {
      return false;
    }
  }

  const postsWithPhoto = posts.filter(filtrarPorID);
  for (let index = 0; index < 9; index++) {
    if (postsWithPhoto[index]) {
      photos = [...photos, postsWithPhoto[index]];
    }
  }

  useEffect(() => {
    const getAllPosts = async () => {
      const { data, error } = await FindAllUserPost(user._id);
      if (error === null) {
        setPosts(data.data);
      } else {
      }
    };

    getAllPosts();
  }, [user]);

  return (
    <div className="fotos">
      <Slider showPhotos={PhotoActive} photos={photos} />
      <div className="head">
        <h3>Fotos</h3>
        <h5 onClick={() => setPhotoActive(!PhotoActive)}>
          Ver todas las fotos
        </h5>
      </div>
      <div className="body">
        <div className="fotoImg">
          {photos.length === 0 ? (
            <span className="text-muted without-photos">
              {'no hay fotos ;('}
            </span>
          ) : (
            <>
              {photos?.map((img) => (
                <div key={img._id}>
                  <img src={img?.image?.url} alt="" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fotos;
