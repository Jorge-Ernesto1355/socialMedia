//mutation
const createMessage = require("./mutations/Message");
const deleteMessage = require("./mutations/DeleteMessage");
const updateMessage = require("./mutations/updateMessage");
//query
const messages = require("./query/Messages");
const message = require("./query/message");

module.exports = {
  query: {
    messages,
    message,
  },
  mutation: {
    createMessage,
    deleteMessage,
    updateMessage,
  },
};
