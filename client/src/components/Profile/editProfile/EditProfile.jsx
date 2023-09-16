import React, { useState } from 'react';
import './EditProfile.css';
import rem from '../../../assets/rem.jpg';
import cross from '../../../assets/cross.png';
import heart from '../../../assets/couple.png';
import FirstPage from './firstPage';
import { AnimatePresence, motion } from 'framer-motion';
import SearchFriends from '../searchFriends/SearchFriends';
import SecondPage from './SecondPage';
import notProfilePicture from '../../../assets/not-suitable.png';

const EditProfile = ({ showEdit, user, hideEdit }) => {
  const display = [{ label: 'nombre' }, { label: 'contraseña' }];

  const [isSelected, setIsSelected] = useState(display[0]);
  const [showCouple, setShowCouple] = useState(false);
  const [file, setFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [frontPage, setFrontPage] = useState(null);

  const [form, setForm] = useState({
    username: '',
    curp: '',
    email: '',
    password1: '',
    password2: ''
  });

  //cargar las imagenes al estado
  const handleImages = (e, type) => {
    const file = e.target.files[0];
    setFile(file);

    previewFile(file, type);
    // setFile(e.target.files)
  };

  const previewFile = (file, type) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (type === 'profilePicture') {
        setProfilePicture(reader.result);
      }
      if (type === 'frontPage') {
        setFrontPage(reader.result);
      }
    };
  };

  const handleForm = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const variantsPhotos = {
    visible: {
      scale: 1,
      transition: {
        duration: 0.2
      }
    },
    hidden: {
      scale: 0,
      y: -100,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={variantsPhotos}
      animate={showEdit ? 'visible' : 'hidden'}
      className="container-edit"
    >
      <button onClick={() => hideEdit(false)} className="button-cross">
        <img src={cross} alt="" />
      </button>
      <h2 className="h2">Cambia tu Perfil</h2>
      <div className="head-edit">
        <div className="profile-edit">
          <div className="photo">
            <img
              src={profilePicture ? profilePicture : notProfilePicture}
              alt=""
            />
            <input
              type="file"
              id="fileInput"
              className="input-file"
              onChange={(e) => handleImages(e, 'profilePicture')}
              accept="image/png, image/jpeg, image/jpg, /image.jfif"
            />
            <h5 className="change-profile">cambiar foto</h5>
          </div>
          <div className="name-edit">
            <h3 className="info">jorge super guapo</h3>
            <span className="text-muted span-role ">admin</span>
          </div>
        </div>
        <div className="couples">
          <h3 className="text-muted">parejas</h3>
          <div className="parejas">
            <div className="photo">
              <img className="img" src={rem} alt="" />
            </div>
            <img className="heart" src={heart} alt="" />
            <div className="photo">
              <img className="img" src={rem} alt="" />
            </div>
          </div>

          <h5 className="change-couple" onClick={() => setShowCouple(true)}>
            cambiar pareja
          </h5>
        </div>
      </div>
      <div className="split-up">
        {display?.map((label) => (
          <h4 onClick={() => setIsSelected(label)} className="label">
            {label.label}

            {label.label === isSelected.label ? (
              <motion.div className="underline" layoutId="underline" />
            ) : null}
          </h4>
        ))}
      </div>
      <div className="showCouples">
        <SearchFriends
          persons={user.friends}
          showPersons={showCouple}
          setShowPersons={setShowCouple}
          type="couples"
        />
      </div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="body-edit"
          key={isSelected ? isSelected.label : 'empty'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="down-edit">
            {isSelected.label === 'nombre' ? (
              <FirstPage
                handleForm={handleForm}
                form={form}
                frontPage={frontPage}
                changeImg={handleImages}
              />
            ) : (
              <SecondPage handleForm={handleForm} form={form} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="buttons">
        <button className="button cancel">
          <h4 onClick={() => hideEdit(false)}>cancelar</h4>
        </button>
        <button className="button accept">
          <h4>aceptar</h4>
        </button>
      </div>
    </motion.div>
  );
};

export default EditProfile;
