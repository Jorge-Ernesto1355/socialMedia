import "./Favorites.css";

// components
import Skeleton from "../Skeleton/Skeleton";
import returnimg from "../../assets/return.png";
import nervious from "../../assets/nervous.png";
import sad from "../../assets/sad-face.png";

// services
import FindAllUserPost from "../../services/FindAllUserPost";

// querys

import { Link, useParams } from "react-router-dom";

// others things

import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

// redux
import FavoritesItem from "./FavoritesItem";
import { useEffect, useState } from "react";


const Favorites = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="Favorites">
      <motion.div className={`card`}>
        <Link to={"/"}>
          <div className="return">
            <img src={returnimg} alt="" />
            <h4>Regresar</h4>
          </div>
        </Link>
        <AnimatePresence>
          <motion.div className="favorites">
            {isLoading ? (
              <Skeleton key={uuidv4()} type={"feed"} />
            ) : (
              <>
                {userPosts.length === 0 ? (
                  <div className="noPosts">
                    <div className="info">
                      <img src={nervious} alt="" />
                      <h4>no hay posts {";("}</h4>
                      <img src={sad} alt="" />
                    </div>

                    <Link to={"/"} className="fav">
                      <h4>añade un post a tus favoritos</h4>
                    </Link>
                  </div>
                ) : (
                  userPosts?.map((post) => <FavoritesItem post={post} key={`favorite-item-key=${post._id}`} />)
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Favorites;
