const uploadPhoto = (e) => {
  const file = e.target.files[0];
  console.log(e);

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    return reader.result;
  };
};

export default uploadPhoto;
