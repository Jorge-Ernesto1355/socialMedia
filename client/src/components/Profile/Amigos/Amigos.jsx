import React, { useState, useEffect } from "react";

import SearchFriends from "../searchFriends/SearchFriends";
import "./Amigos.css";

const Amigos = ({ user }) => {
  const [friendsUser, setFriendsUser] = useState([]);
  const [showFriends, setshowFriends] = useState(false);

  useEffect(() => {
    setFriendsUser(user?.friends);
  }, [user]);

  let friends = [];

  for (let index = 0; index < 9; index++) {
    if (friendsUser[index]) {
      friends = [...friends, friendsUser[index]];
    }
  }

  return (
    <div className="amigos">
      <div className="head">
        <div className="info">
          <h4>Amigos</h4>
          <span className="text-muted">
            {user?.friends?.length ? user?.friends?.length : 0} amigos
          </span>
        </div>
        <span
          className="text-muted"
          onClick={() => setshowFriends(!showFriends)}
        >
          ver todos los amigos
        </span>
      </div>

      <div className="body">
        <SearchFriends
          showPersons={showFriends}
          persons={friendsUser}
          setShowPersons={setshowFriends}
          type="friends"
        />
        <div className="amigos-profile">
          {friends.length === 0 ? (
            <span className="without-friends text-muted">
              {"no hay amigos ;"}
            </span>
          ) : (
            <>
              {friends?.map((img) => (
                <div className="foto" key={`friend-key=${img._id}`}>
                  <img src={img?.image?.url} alt="" />
                  <span>{img?.username}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Amigos;
