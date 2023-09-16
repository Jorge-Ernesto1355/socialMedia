import React, { useState } from 'react';
import lock from '../../../assets/lock.png';
import hide from '../../../assets/visibilityhide.png';
import hide1 from '../../../assets/visibility.png';
import key from '../../../assets/key.png';
const SecondPage = ({ handleForm, form }) => {
  const [visibility1, setVisibility1] = useState(false);
  const [visibility2, setVisibility2] = useState(false);

  return (
    <div>
      <div className="left-edit">
        <div className="all-input">
          <h4 className="text muted">contrasena</h4>
          <div className="input-slide">
            <img src={lock} alt="" />
            <div className="input">
              <input
                onChange={(e) => handleForm(e)}
                name="password1"
                type={`${visibility1 ? 'text' : 'password'}`}
                placeholder="contraseña"
              />
              <img
                onClick={() => setVisibility1(!visibility1)}
                src={`${visibility1 ? hide1 : hide}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="all-input">
          <h4 className="text muted">contrasena otra vez</h4>
          <div className="input-slide">
            <img src={key} alt="" />
            <div className="input">
              <input
                onChange={(e) => handleForm(e)}
                name="password2"
                type={`${visibility2 ? 'text' : 'password'}`}
                placeholder="contrasena otra vez"
              />
              <img
                onClick={() => setVisibility2(!visibility2)}
                src={`${visibility2 ? hide1 : hide}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
