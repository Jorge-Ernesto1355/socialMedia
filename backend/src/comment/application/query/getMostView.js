const CommentService = require("../CommentService");



const getMostView = async (req, res)=>{

    const {containerId, type} = req.params
    
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const commentMostView = await CommentService.mostView({containerId, type, limit, page})

    if(commentMostView?.error)
        return res.status(500).json({error: commentMostView.message})
    
    return res.status(200).json(commentMostView)

}

module.exports = getMostView