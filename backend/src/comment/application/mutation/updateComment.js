const  z  = require("zod");
const { validateComment } = require("../CommentSchema");
const CommentService = require("../CommentService");

const commentUpdateValidation = z.object({
  commentId:z
  .string({
    required_error: "PostId is required",
  })
  .max(24)
  .min(24),
  text: z.string({
    required_error: "text is required",
  }).nonempty().max(200)
})

const updateComment = async (req, res)=> {

  const {commentId} = req.params
  const {text} = req.body

  const result = commentUpdateValidation.safeParse({text, commentId})

   if (result.error) {
     return res.status(400).json({ error: result.error.message });
   }

  const commentUpdated = await CommentService.update({commentId, text})
  if(commentUpdated.error){
    return res.status(500).json({message:commentUpdated.message})
  }
  
  return res.status(200).json(commentUpdated)
}


module.exports = updateComment