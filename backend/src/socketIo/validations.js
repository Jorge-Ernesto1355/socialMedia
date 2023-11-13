const z = require("zod");

const validationConversation = z.object({
  from: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  to: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
});

function validateConversation(object) {
  return validationConversation.safeParse(object);
}

module.exports = { validateConversation };
