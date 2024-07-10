const  storyService = require("./storyService")

const createStory = async (req, res)=>{

    const {expiresIn,  text } = req.body
    const {userId} = req.params


    if(!expiresIn || !text || !userId) return res.status(500).json({error: "Insuficient arguments"})

    const createStory = await  storyService.createStory({userId, media: req?.files?.media, text, expiresIn, background: req?.body?.background})


    if(createStory?.error) return res.status(500).json({error: createStory?.message})

    return res.json(createStory)

}

module.exports = createStory