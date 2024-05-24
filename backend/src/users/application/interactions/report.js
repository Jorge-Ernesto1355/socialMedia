
const userService = require("../../userService")


const report =  async (req, res)=>{

  const { postId} = req.params
  const {userId} = req.query
  const report = await userService.report({userId, postId})

  if(report.error){
    return res.status(500).json({error: report.message})
  }

  return res.status(200).json(report)
  
}

module.exports = report