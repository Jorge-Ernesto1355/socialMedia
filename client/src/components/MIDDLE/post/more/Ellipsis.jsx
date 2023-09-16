import React, { useState } from 'react';
import './Ellipsis.css';

import reloj from '../../../../assets/iconsPost/reloj.png';
import deleteUser from '../../../../assets/iconsPost/deleteUser.png';
import visibility from '../../../../assets/iconsPost/visibility.png';
import alert from '../../../../assets/iconsPost/alert.png';
import editIcon from '../../../../assets/edit.png';
import deletePost from '../../../../assets/delete-post.png';
const Ellipsis = ({ children, username, EditPost, edit, mutateDelete }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`action ${active ? 'active' : ''}`}
      onClick={() => setActive(!active)}
    >
      <span>{children}</span>
      <ul>
        <li>
          <img src={reloj} alt="" />
          <h5>{`reportar a ${username}`}</h5>
        </li>
        <li>
          <img src={deleteUser} alt="" />
          <h5>{`dejar de seguir ${username}`}</h5>
        </li>
        <li>
          <img src={visibility} alt="" /> <h5>Ocultar esta aplicacion</h5>
        </li>
        <li onClick={() => EditPost(!edit)}>
          <img src={editIcon} alt="" /> <h5>editar el post</h5>
        </li>
        <li onClick={() => mutateDelete()}>
          <img src={deletePost} alt="" /> <h5>eliminar el post</h5>
        </li>
      </ul>
    </div>
  );
};

export default Ellipsis;
