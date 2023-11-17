const z = require("zod");

const allowedTypes = ["Post", "Comment", "Message"];
const allowedLabels = ["gusta", "encanta", "entristece", "asombra", "divierte"];

const ReactionSchema = z.object({
  label: z
    .string()
    .nonempty()
    .refine((value) => allowedLabels.includes(value), {
      message: 'label of reaaction not exists".',
    }),
  containerId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  type: z
    .string()
    .nonempty()
    .refine((value) => allowedTypes.includes(value), {
      message: 'El tipo debe ser "Post" o "Comment".',
    }),
  userId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  value: z.number({
    required_error: "value is required",
  }),
});

const getReactionSchema = z.object({
  label: z
    .string()
    .nonempty()
    .refine((value) => allowedLabels.includes(value), {
      message: 'label of reaction not exists".',
    }),
  containerId: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  type: z
    .string()
    .nonempty()
    .refine((value) => allowedTypes.includes(value), {
      message: 'El tipo debe ser "Post" o "Comment".',
    }),
});

function validateGetReaction(object) {
  return getReactionSchema.safeParse(object);
}

function validateReaction(object) {
  return ReactionSchema.safeParse(object);
}

module.exports = { validateReaction, ReactionSchema, validateGetReaction };
