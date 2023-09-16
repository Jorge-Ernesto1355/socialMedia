import './Navbar.css';

//librerias
import React, { useState } from 'react';
import rem from '../../../assets/rem.jpg';
import { Users } from '../../RIGHT/SearchFriends/User';

//icons

import { BsSearch } from 'react-icons/bs';
import SearchingPeople from '../SearchingPeople';

const Navbar = () => {
  const [query, setquery] = useState('');

  return (
    <nav>
      <div className="container">
        <h2 className="log">cbta 81</h2>
        <div className="search-bar">
          <i>
            <BsSearch />
          </i>

          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <div className="searchingPeople">
            <SearchingPeople Users={Users} query={query}></SearchingPeople>
          </div>
        </div>
        <div className="create">
          <div className="profile-photo">
            <img src={rem} alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
