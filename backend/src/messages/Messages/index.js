//mutation
const createMessage = require("./mutations/Message");
const deleteMessage = require("./mutations/DeleteMessage");
const updateMessage = require("./mutations/updateMessage");
const markAsRead = require("./mutations/read.js");
const messageToAll = require("./mutations/sendToAll.js");

//query
const messages = require("./query/Messages");
const message = require("./query/message");
const lastMessage = require("./query/lastMessage");
const unRead = require("./query/unRead.js");

module.exports = {
  query: {
    messages,
    message,
    lastMessage,
    unRead,
  },
  mutation: {
    createMessage,
    deleteMessage,
    updateMessage,
    markAsRead,
    messageToAll,
  },
};
