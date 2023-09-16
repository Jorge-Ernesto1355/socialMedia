import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Post from '../MIDDLE/post/post/Post';
import deleteImg from '../../assets/delete.png';

const FavoritesItem = ({ post }) => {
  const [selectedId, setSelectedId] = useState(null);

  const container = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="item"
    >
      <div className="head">
        <button className="delete">
          <img src={deleteImg} alt="" />
        </button>
        <Link to={`/profile/${post.userId}/${post._id}`} className="watch">
          Ver Publicacion
        </Link>
      </div>
      <Post key={post._id} post={post} layoutId={post._id} />
    </motion.div>
  );
};

export default FavoritesItem;
