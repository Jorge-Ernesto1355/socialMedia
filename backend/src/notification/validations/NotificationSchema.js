const z = require("zod");

const NotificationSchema = z.object({
  type: z
    .string({
      required_error: "type is required",
    })
    .max(20),
  message: z
    .string({
      required_error: "message is required",
    })
    .max(40),
  receiverId: z
    .string({
      required_error: "userReceptor is required",
    })
    .max(24)
    .min(24),
  senderId: z
    .string({
      required_error: "senderId is required",
    })
    .max(24)
    .min(24),
});

function validateNotification(object) {
  return NotificationSchema.safeParse(object);
}

module.exports = validateNotification;
