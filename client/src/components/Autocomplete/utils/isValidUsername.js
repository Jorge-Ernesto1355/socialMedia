export function isValidUsername(username = '') {
    return /^@\w{1,15}$/.test(username);
  }