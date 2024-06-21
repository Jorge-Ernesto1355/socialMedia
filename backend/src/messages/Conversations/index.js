//mutation
const Conversation = require("./mutations/Conversation");
const blockContact = require("./mutations/Blockcontact");

//query
const getConversations = require("./query/Conversations");
const getConversation = require("./query/getConversation");
const getUnReadConversations = require("./query/getUnReadConversation");
const getConversationId = require("./query/getConversationId");

module.exports = {
  query: {
    getConversations,
    getConversation,
    getUnReadConversations,
    getConversationId
  },
  mutation: {
    Conversation,
    blockContact,
  },
};
