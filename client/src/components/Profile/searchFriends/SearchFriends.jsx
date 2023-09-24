import React, { useState } from "react";
import "./searchFriends.css";
import rem from "../../../assets/rem.jpg";
import search from "../../../assets/search.png";
import across from "../../../assets/cross.png";
// framer
import { motion } from "framer-motion";
import { Users } from "../../RIGHT/SearchFriends/User";
const SearchFriends = ({ persons, showPersons, setShowPersons, type }) => {
  const [query, setQuery] = useState("");

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
      animate={showPersons ? "visible" : "hidden"}
      className={`container-friends ${type}`}
    >
      <div className="button">
        <button className="across" onClick={() => setShowPersons(false)}>
          <img src={across} alt="" />
        </button>
      </div>

      <div className="head-friends">
        <div className="searcher">
          <img className="icon" src={search} alt="" />
          <input
            type="text"
            placeholder="Busca amigos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="body-friends">
        {Users.length === 0 ? (
          <span className="text-muted no">{"no hay amigos ;´("}</span>
        ) : (
          Users.filter((user) =>
            user.username.toLowerCase().includes(query ?? 'a'),
          )?.map((friend) => (
            <div className="friend" key={`friend-key=${friend.id}`}>
              <div className="profile-picture">
                <img src={rem} alt="" />
              </div>
              <div className="info">
                <div className="username">{friend?.username}</div>
                <span className="text-muted">
                  <span>3</span> amigo en comun
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default SearchFriends;
