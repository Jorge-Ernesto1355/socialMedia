//mutation
const Conversation = require("./mutations/Conversation");

//query
const getConversations = require("./query/Conversations");

module.exports = {
  query: {
    getConversations,
  },
  mutation: {
    Conversation,
  },
};
