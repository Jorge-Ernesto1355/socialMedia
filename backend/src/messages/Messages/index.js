//mutation
const message = require("./mutations/Message");
const deleteMessage = require("./mutations/DeleteMessage");
const updateMessage = require("./mutations/updateMessage");
//query
const messages = require("./query/Messages");

module.exports = {
  query: {
    messages,
  },
  mutation: {
    message,
    deleteMessage,
    updateMessage,
  },
};
