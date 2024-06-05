const  storyService = require("./storyService")
const DEFAULT_LIMIT = 2;
const DEFAULT_PAGE = 1;
const getStoriesFromUser = async (req, res)=>{

    const {userId} = req.params

    const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;

    if( !userId) return res.status(500).json({error: "Insuficient arguments"})

    const getStoriesFromUser = await storyService.getStoriesFromUser({userId, limit, page})


    if(getStoriesFromUser?.error) return res.status(500).json({error: getStoriesFromUser?.message})

    return res.json(getStoriesFromUser)

}

module.exports = getStoriesFromUser