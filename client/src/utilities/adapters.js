export const userAdapter = (user) => {
  return {
    username: user.username,
    ProfilePicture: user.imageProfile,
    roles: user.roles
  };
};

export const userFailure = () => {
  return {
    username: 'sin nombre',
    ProfilePicture: '',
    roles: []
  };
};
