
const ReactionService = require("../ReactionService");

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;


const getReactions = async (req, res)=>{

    const limit = parseInt(req.query.limit, 10)  || DEFAULT_LIMIT;
    const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;

    const { type, containerId} = req.params

    
    const reactions = await ReactionService.getAll({
        type, containerId, page, limit
    })

    if (reactions?.error)
    return res.status(400).json({ error: reactions.message });

  return res.status(200).json(reactions);
    
}
module.exports = getReactions