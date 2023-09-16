
const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    dispatch(ImgReady(file));
    previewFile(file);
    // setFile(e.target.files)
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(PostImg(reader.result));
    };
  };