export function isYourFriend(userFriends, friendId) {
  return Array.isArray(userFriends) && userFriends.length > 0 && userFriends.includes(friendId);
}