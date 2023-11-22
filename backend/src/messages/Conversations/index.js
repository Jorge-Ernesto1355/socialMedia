//mutation
const Conversation = require("./mutations/Conversation");
const blockContact = require("./mutations/Blockcontact");

//query
const getConversations = require("./query/Conversations");
const getConversation = require("./query/getConversation");

module.exports = {
  query: {
    getConversations,
    getConversation,
  },
  mutation: {
    Conversation,
    blockContact,
  },
};
