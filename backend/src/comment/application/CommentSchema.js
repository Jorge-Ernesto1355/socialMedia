const z = require("zod");

const CommentSchema = z.object({
  containerId: z
    .string({
      required_error: "PostId is required",
    })
    .max(24)
    .min(24),
  userId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),

  text: z
    .string({
      required_error: "text is required",
    })
    .nonempty()
    .max(200),
});

function validateComment(object) {
  return CommentSchema.safeParse(object);
}

module.exports = { CommentSchema, validateComment };
