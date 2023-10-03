const z = require("zod");

const VoteSchema = z.object({
  counter: z.array(z.string()).optional(),
  uuid: z.string().nonempty().min(1).max(255), // Ajusta la longitud máxima según tus necesidades
  text: z.string().nonempty().min(1).max(20),
});

function validateVote(object) {
  return VoteSchema.safeParse(object);
}

modules.exports = { VoteSchema, validateVote };
