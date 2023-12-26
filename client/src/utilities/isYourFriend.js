export function isYourFriend(userFriends, friendId) {
  if (!userFriends && !friendId) return false;
  if (userFriends?.length <= 0) return false;
  return userFriends?.includes(friendId);
}
