import React, { useState } from 'react';
import { motion } from 'framer-motion';

import rem from '../../../assets/rem.jpg';

import search from '../../../assets/search.png';
import './SearchFriends.css';
import { Users } from './User';

const SearchFriends = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="search-bar-friends">
      <div className="input">
        <img className="icon" src={search} alt="" />
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          className="searchFriends"
          placeholder="Search Messages"
          value={query}
          id="message-search"
        />
      </div>

      <motion.ul className={`searchFriendsUl ${query ? 'active' : ''}`}>
        {Users.filter((user) =>
          user.username.toLowerCase().includes(query)
        ).map((user) => (
          <li key={user.id} className="listItem">
            <div className="profile-photo">
              <img src={rem} alt="" />
            </div>
            <div className="message-body">
              <h5>{user.username}</h5>
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default SearchFriends;
