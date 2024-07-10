function extractMentions(text) {
    const mentionRegex = /@([a-zA-Z]+\s[a-zA-Z]+)/g;
    let matches;
    const mentions = [];
  
    while ((matches = mentionRegex.exec(text)) !== null) {
      mentions.push(matches[1]);
    }
  
    return mentions;
  }

module.exports = extractMentions