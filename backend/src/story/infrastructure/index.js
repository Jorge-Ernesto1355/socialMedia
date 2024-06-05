const createStory = require("../application/createStory");
const getStoriesByUser = require("../application/getStoriesByUser");
const getStoriesFromUser = require("../application/getStoriesFromUser");


module.exports = {
     mutation: {
        createStory, 
     }, 
     query: {
        getStoriesByUser, 
        getStoriesFromUser
        
     }
}