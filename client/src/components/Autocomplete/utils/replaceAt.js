export function replaceAt(str, replacement, index, length = 0) {
  const prefix = str.substr(0, index);
  const suffix = str.substr(index + length);

  return prefix + replacement + suffix;
}
