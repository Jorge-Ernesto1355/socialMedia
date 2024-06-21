const z = require("zod");
const ReactionSchema = require("../../../reaction/ReactionSchema");
const { VoteSchema } = require("../interact/votes/validations/VoteSchema");
const { CommentSchema } = require("../../../comment/application/CommentSchema");

const PostSchema = z.object({
  userId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  description: z
    .string({
      required_error: "description is required",
    })
    .max(300),

 
});

function validatePost(object) {
  return PostSchema.safeParse(object);
}

module.exports = { PostSchema, validatePost };
