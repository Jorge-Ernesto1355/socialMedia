const React = require("./application/React");

const getReactions = require("./application/getReactions");
const getReaction = require("./application/getReaction");
const getViewReactions = require("./application/reactionsView");

module.exports = {
  mutation: {
    React,
  },
  query: {
    getReactions,
    getReaction,
    getViewReactions,
  },
};
