const createImagen = require("./application/createPost/createImagen");
const createVotes = require("./application/createPost/createVotes");

function exits(object) {
  if (!objectCreate) throw new Error("not found parameters");
}

  static async difusion(object) {
    exits(object);

    const { description, userId, votes, difusion, postShared, usersTagged } =
      object;

    let image = null;
    try {
      image = await createImagen(req);
      votes > 0 && (await createVotes({ req, res, votes }));

      const newPost = new Post({ userId, description, image });
      if (postShared) newPost.postShared = postShared;
    } catch (error) {}
  }
}
