const  storyService = require("./storyService")
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const getStoriesByUser = async (req, res)=>{

    const {userId} = req.params

    
  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
     

    if( !userId) return res.status(500).json({error: "Insuficient arguments"})

    const getStoriesByUser = await  storyService.getStoriesByUser({userId, limit, page})



    if(getStoriesByUser?.error) return res.status(500).json({error: getStoriesByUser?.message})

    return res.json(getStoriesByUser)

}

module.exports = getStoriesByUser