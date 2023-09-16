import React, { useState } from 'react';

import './Ellipsi.css';

const EllipsisComment = ({
  children,
  changeEditarComment,
  EliminarComment,
  commentId
}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`action-comment  ${active ? 'active' : ''}`}
      onClick={() => setActive(!active)}
    >
      <span>{children}</span>
      <ul>
        <li>
          <h5>Ocultar comentario</h5>
        </li>
        <li>
          <h5>Reportar comentario</h5>
        </li>
        <li onClick={() => changeEditarComment(true)}>
          <h5>Editar comentario</h5>
        </li>
      </ul>
    </div>
  );
};

export default EllipsisComment;
