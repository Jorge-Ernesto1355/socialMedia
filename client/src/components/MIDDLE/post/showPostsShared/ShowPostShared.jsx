import React from "react";
import "./ShowPostShared.css";
import Post from "../post/Post";
import cross from "../../../../assets/cross.png";
import { GetAllPostsSharedQuery } from "../useQuery/useQuerys";
import { motion } from "framer-motion";

const ShowPostShared = ({ postId, showPostsShared, changePostShared }) => {
  const { data: postsShared } = GetAllPostsSharedQuery(postId);

  const variantsPhotos = {
    visible: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    hidden: {
      scale: 0,
      y: -100,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={variantsPhotos}
      animate={showPostsShared ? "visible" : "hidden"}
      className="card-showPostsShared"
    >
      <div className="showPostsShared">
        <div className="info-show">
          <h3>Personas que compartieron esto</h3>
          <button onClick={() => changePostShared(false)}>
            <img src={cross} alt="" />
          </button>
        </div>
        {postsShared?.data?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </motion.div>
  );
};

export default ShowPostShared;
