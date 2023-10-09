
const CommentService = require('../CommentService')

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const getCommentResponded = async (req, res)=>{
  const {commentId} = req.params
  const limit = parseInt(req.query.limit, 10)  || DEFAULT_LIMIT;
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;


  const commentsResponded =  await CommentService.getResponded({commentId , page, limit })

 
  if(commentsResponded.error){
    return res.status(500).json({message: commentsResponded.message})
  }
 
  return  res.status(200).json(commentsResponded)
  
}


module.exports = getCommentResponded