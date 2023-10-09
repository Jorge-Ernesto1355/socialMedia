const validateIdZod = require("../../../libs/validateIdZod")
const CommentService = require("../CommentService")

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const getComments = async  (req, res)=>{

    const limit = parseInt(req.query.limit, 10)  || DEFAULT_LIMIT;
    const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;

    const {containerId, type} = req.params

  const result = validateIdZod({id:containerId, type})
  if(result.error){
    return res.status(422).json({message: result.error.message})
  }

  const comments = await CommentService.getAll({containerId, type, limit, page})

  if(comments.error){
    return res.status(500).json({message: comments.message})
  }

  return res.status(200).json(comments)


}

module.exports = getComments