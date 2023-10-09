const { Router } = require("express");
const index  = require('../index')

const router = Router()

router.put('/:containerId', index.mutation.React)

router.get('/all/:containerId/:type',index.query.getReactions )

router.get('/:containerId/:type', index.query.getReaction)

module.exports = router