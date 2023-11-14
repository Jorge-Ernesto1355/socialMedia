const z = require("zod");
const messageShema = z.object({
  message: z
    .string({
      required_error: "message is required",
    })
    .max(24),
  to: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
  from: z
    .string({
      required_error: "userId is required",
    })
    .max(24)
    .min(24),
});

function validateMessage(object) {
  return messageShema.safeParse(object);
}

module.exports = { validateMessage };
