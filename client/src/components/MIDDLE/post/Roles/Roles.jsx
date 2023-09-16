import React from 'react';
import './Roles.css';
import Role from './Role';

const Roles = ({ roles }) => {
  return (
    <div className="Roles">
      <Role role={'admin'} />
      <Role role={'plantel'} />
    </div>
  );
};

export default Roles;
