import React from "react";
import "./SearchingPeople.css";
import rem from "../../assets/rem.jpg";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const SearchingPeople = ({ Users, query }) => {
  // const show = (user) => {
  //   if (query) {
  //     return (
  //       <li key={user.id} className="ItemPeople">
  //         <div className="profile-photo">
  //           <img src={rem} alt="" />
  //         </div>
  //         <div className="message-body">
  //           <h5>{user.username}</h5>
  //           <span>amigo</span>
  //         </div>
  //       </li>
  //     );
  //   } else {
  //     return <div>no hay </div>;
  //   }
  // };
  // return (
  //   <motion.div className={`cardNavbar ${query ? 'active' : ''} `}>
  //     <ul className="listUsers" key={uuidv4()}>
  //       {Users.filter((user) =>
  //         user.username.toLowerCase().includes(query)
  //       ).map((user) => show(user))}
  //     </ul>
  //   </motion.div>
  // );
};

export default SearchingPeople;
