const React = require('./application/React')



const getReactions = require('./application/getReactions')
const getReaction = require('./application/getReaction')

module.exports = {
  mutation:{
    React
  }, 
  query:{
    getReactions, 
    getReaction
  }
    
}