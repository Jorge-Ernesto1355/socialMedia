const getSomeElements = (index, array) => {
  let elementos = [];

  for (let i = 0; i < index; i++) {
    if (array[i]) {
      elementos = [...elementos, array[i]];
    }
  }

  return elementos;
};

export default getSomeElements;
