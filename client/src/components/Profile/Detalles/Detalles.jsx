import React, { useEffect, useState } from 'react';
import './Detalles.css';

import casa from '../../../assets/casa.png';
import hearth from '../../../assets/hearth.png';
import location from '../../../assets/location.png';
import hobbies from '../../../assets/pintura.png';
const Detalles = ({ details }) => {
  const [editDetails, setEditDetails] = useState(false);
  const [addHobbies, setAddHobis] = useState(false);

  const [editForm, setEditForm] = useState({
    living: '',
    location: '',
    single: '',
    hobbies: ''
  });

  useEffect(() => {
    setEditForm(details);
  }, [details]);

  const handleForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  return (
    <div className="detalles">
      <h3>Detalles</h3>
      <div className="card">
        <div className="ubicacion">
          <div className="icons">
            <img src={casa} alt="" />
            {editDetails ? (
              <input
                className="editDetails"
                type="text"
                name="living"
                onChange={(e) => handleForm(e)}
                value={editForm.living}
              />
            ) : (
              <h4>{details.living}</h4>
            )}
          </div>
          <div className="icons">
            <img src={location} alt="" />
            {editDetails ? (
              <input
                className="editDetails"
                type="text"
                name="location"
                onChange={(e) => handleForm(e)}
                value={editForm.location}
              />
            ) : (
              <h4>{details.location}</h4>
            )}
          </div>
          <div className="icons">
            <img src={hearth} alt="" />
            {editDetails ? (
              <input
                className="editDetails"
                type="text"
                name="single"
                onChange={(e) => handleForm(e)}
                value={editForm.single}
              />
            ) : (
              <h4>{details.single}</h4>
            )}
          </div>

          <div className="icons">
            <img src={hobbies} alt="" />
            {editDetails ? (
              <input
                className="editDetails"
                type="text"
                name="hobbies"
                onChange={(e) => handleForm(e)}
                value={editForm.hobbies}
              />
            ) : (
              <h4>{details.hobbies}</h4>
            )}
          </div>

          <div className="buttons">
            <button className="edit">
              <h5 onClick={() => setEditDetails(!editDetails)}>
                Editar detalles
              </h5>
            </button>
            {editDetails ? null : (
              <button className="edit">
                <h5 onClick={() => setAddHobis(!addHobbies)}>
                  agregar pasatiempos
                </h5>
              </button>
            )}
            {editDetails ? (
              <button className="edit">
                <h5 onClick={() => setAddHobis(!addHobbies)}>aceptar</h5>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
