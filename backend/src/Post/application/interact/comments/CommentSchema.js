const z = require("zod");
const ReactionSchema = require("../actions/ReactionSchema");

const CommentSchema = z.object({
  comment: z.object({
    userId: z.string().optional(),
    edit: z.boolean().default(false).optional(),
    text: z.string().nonempty(),
    image: z
      .object({
        url: z.string(),
        public_id: z.string(),
      })
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
  commentsResponded: z.array(CommentSchema).optional(),
});

function validateComment(object) {
  return CommentSchema.safeParse(object);
}

modules.exports = { CommentSchema, validateComment };
