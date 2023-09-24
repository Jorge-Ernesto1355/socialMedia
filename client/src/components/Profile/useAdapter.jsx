export const FailureAdapter = () => {
  return {
    coverPicture: {},
    imageProfile: {},
    _id: "",
    username: "sin nombre",
    email: "",
    password: "",
    friends: [],
    friendsWaiting: [],
    curp: "",
    posts: [],
    Admin: false,
    resetToken: "",
    relationShipWaiting: [],
    relationShip: [],
    roles: [],
    createdAt: "",
    updatedAt: "",
  };
};

export const UserAdapterSucces = (user) => {
  return {
    coverPicture: "",
    imageProfile: "",
    _id: "",
    username: "",
    email: "",
    friends: "",
    friendsWaiting: "",
    posts: "",
    Admin: "",
    relationShipWaiting: "",
    relationShip: "",
    roles: "",
  };
};
