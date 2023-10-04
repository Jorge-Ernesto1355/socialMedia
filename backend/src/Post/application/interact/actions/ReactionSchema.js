const z = require("zod");

const ImageProfileSchema = z.object({
  url: z.string(),
  public_id: z.string(),
});

const UserSchema = z.object({
  userId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  username: z.string(),
  imageProfile: ImageProfileSchema.optional(),
});

const ReactionSchema = z.object({
  label: z.string({
    required_error: "label is required",
  }),
  containerId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  userId:z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  value: z.number({
    required_error: "value is required",
  }),
});

function validateReaction(object) {
  return ReactionSchema.safeParse(object);
}

module.exports = { validateReaction, ReactionSchema };
