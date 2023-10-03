const z = require("zod");

const ImageSchema = z.object({
  url: z.string(),
  public_id: z.string(),
});

const UserSchema = z.object({
  username: z.string().nonempty().min(5).max(15),
  email: z.string().nonempty().max(50),
  password: z.string().nonempty().min(6),
  coverPicture: ImageSchema.nullable().optional(),
  friends: z.array(z.string()).optional(),
  friendsWaiting: z.array(z.string()).optional(),
  curp: z.string().nonempty().optional(),
  description: z.string().max(80).nullable().optional(),
  posts: z.array(z.string()).optional(),
  imageProfile: ImageSchema.optional(),
  admin: z.boolean().default(false).optional(),
  resetToken: z.string().default("").optional(),
  relationshipWaiting: z.array(z.string()).optional(),
  relationship: z.array(z.string()).optional(),
  favorites: z.array(z.string()).optional(),
});

function validateUser(object) {
  return UserSchema.safeParse(object);
}

module.exports = { validateUser, UserSchema };
