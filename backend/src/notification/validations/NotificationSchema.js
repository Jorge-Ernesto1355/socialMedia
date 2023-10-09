const z = require("zod");

const NotificationSchema = z.object({
  label: z
    .string({
      required_error: "label is required",
    })
    .max(20),
  message: z
    .string({
      required_error: "message is required",
    })
    .max(40),
  userReceptorId: z
    .string({
      required_error: "userReceptor is required",
    })
    .max(24)
    .min(24),
  userConnectorId: z
    .string({
      required_error: "message is required",
    })
    .max(24)
    .min(24),
});

function validateNotification(object) {
  return NotificationSchema.safeParse(object);
}

module.exports = validateNotification;
