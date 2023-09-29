const MutualFriends = ({ friendsRequest = [], myFriends = [] }) => {
  const tusAmigosSet = new Set(myFriends);
  const amigosDeAmigoSet = new Set(friendsRequest);

  const mutuos =
    [...tusAmigosSet].filter((amigo) => amigosDeAmigoSet.has(amigo)) ?? 0;

  return mutuos;
};

export default MutualFriends;
