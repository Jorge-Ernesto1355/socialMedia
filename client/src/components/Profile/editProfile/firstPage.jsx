import React from 'react';
import userPhoto from '../../../assets/user.png';
import correo from '../../../assets/correo.png';
import folder from '../../../assets/folder.png';
import ufo from '../../../assets/ufo.png';
import photo from '../../../assets/photos.png';
import { motion, AnimatePresence } from 'framer-motion';
const FirstPage = ({ handleForm, form, frontPage, changeImg }) => {
  return (
    <div className="body-info">
      <div className="left-edit">
        <div className="all-input">
          <h4 className="text muted">Nombre</h4>
          <div className="input-slide">
            <img src={userPhoto} alt="" />
            <div className="input">
              <input
                value={form.username}
                name="username"
                onChange={(e) => handleForm(e)}
                type="text"
                placeholder="escribe un nombre..."
              />
            </div>
          </div>
        </div>
        <div className="all-input">
          <h4 className="text muted">Curp</h4>
          <div className="input-slide">
            <img src={folder} alt="" />
            <div className="input">
              <input
                value={form.curp}
                onChange={(e) => handleForm(e)}
                type="text"
                name="curp"
                placeholder="escribe la Curp..."
              />
            </div>
          </div>
        </div>
        <div className="all-input">
          <h4 className="text muted">correo</h4>
          <div className="input-slide">
            <img src={correo} alt="" />
            <div className="input">
              <input
                value={form.email}
                onChange={(e) => handleForm(e)}
                type="text"
                name="email"
                placeholder="escribe un correo..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rigth-edit">
        <div className="coverPicture">
          <img
            className={`${frontPage ? 'frontPage' : ''}`}
            src={frontPage ? frontPage : ufo}
            alt=""
          />

          <div className="change">
            <img src={photo} alt="" />

            {frontPage ? null : (
              <motion.h4 className="ovnis">
                Los ovnis abducieron la portada
              </motion.h4>
            )}

            <input
              type="file"
              id="fileInput"
              className="input-file"
              onChange={(e) => changeImg(e, 'frontPage')}
              accept="image/png, image/jpeg, image/jpg, /image.jfif"
            />
            <h4>cambiar portada</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
