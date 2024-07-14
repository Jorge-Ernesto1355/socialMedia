const { Router } = require("express");
const index = require('./index.js')
const router = Router();



router.post('/:userId', index.mutation.createStory)

router.get("/storiesByUser/:userId", index.query.getStoriesByUser)

router.get("/storiesFromUser/:userId", index.query.getStoriesFromUser)

router.get("/feed/:userId", index.query.feedStories)


module.exports = router