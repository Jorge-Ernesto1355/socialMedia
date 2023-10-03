const z = require("zod");
const ReactionSchema = require("../interact/actions/ReactionSchema");
const { CommentSchema } = require("../interact/comments/CommentSchema");
const { VoteSchema } = require("../interact/votes/validations/VoteSchema");

const PostSchema = z.object({
  userId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  description: z
    .string({
      required_error: "userId is required",
    })
    .max(200),
  image: z
    .object({
      url: z.string().optional(),
      public_id: z.string().optional(),
    })
    .optional(),
  comments: z.array(CommentSchema).optional(),
  shares: z.array(z.string()).optional(),
  votes: z.array(VoteSchema).optional(),
  postShared: z.string().optional(),
  reactions: z
    .object({
      gusta: z.array(ReactionSchema),
      encanta: z.array(ReactionSchema),
      asombra: z.array(ReactionSchema),
      divierte: z.array(ReactionSchema),
      entristece: z.array(ReactionSchema),
    })
    .optional(),
  group: z.string().optional(),
  edit: z.boolean().optional(),
});

function validatePost(object) {
  return PostSchema.safeParse(object);
}

modules.exports = { PostSchema, validatePost };
