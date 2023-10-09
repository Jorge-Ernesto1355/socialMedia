const z = require("zod");
const { ReactionSchema } = require("../../reaction/ReactionSchema");


const CommentSchema = z.object({
  comment: z.object({
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
    edit: z.boolean().default(false).optional(),
    text: z.string({
      required_error: "text is required",
    }).nonempty().max(200),
    image: z
      .object({
        url: z.string(),
        public_id: z.string(),
      }).optional()
      .nullable(), // Puede ser nulo si no hay imagen
    reactions: z
      .object({
        gusta: z.array(ReactionSchema),
        encanta: z.array(ReactionSchema),
        asombra: z.array(ReactionSchema),
        divierte: z.array(ReactionSchema),
        entristece: z.array(ReactionSchema),
      })
      .optional(),
  }),
  commentsResponded: z.array(z.string()).optional(),
});

function validateComment(object) {
  return CommentSchema.safeParse(object);
}

module.exports = { CommentSchema, validateComment };
