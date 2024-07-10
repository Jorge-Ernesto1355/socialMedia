const createStory = require("../application/createStory");
const feedStories = require("../application/feedStories");
const getStoriesByUser = require("../application/getStoriesByUser");
const getStoriesFromUser = require("../application/getStoriesFromUser");


module.exports = {
     mutation: {
        createStory, 
     }, 
     query: {
        getStoriesByUser, 
        getStoriesFromUser, 
        feedStories
        
     }
}