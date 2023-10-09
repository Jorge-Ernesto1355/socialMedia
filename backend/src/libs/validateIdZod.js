const z = require("zod")
const allowedTypes = ["Post", "Comment"];

const validateid = z.object({
    id:  z
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
})


module.exports = function validateId(object){
    return validateid.safeParse(object)
}