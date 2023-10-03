const z = require("zod");

const ImageProfileSchema = z.object({
  url: z.string(),
  public_id: z.string(),
});

const UserSchema = z.object({
  userId: z.string(),
  username: z.string(),
  imageProfile: ImageProfileSchema.optional(),
});

const ReactionSchema = z.object({
  label: z.string(),
  user: UserSchema,
});

function validateReaction(object) {
  return ReactionSchema.safeParse(object);
}

modules.exports = { validateReaction, ReactionSchema };
