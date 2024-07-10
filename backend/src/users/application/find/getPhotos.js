
const userService = require("../../userService");

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

const getPhotos = async (req, res) => {
  const { userId } = req.params;

  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;

  const getPhotos = await userService.getPhotos({ userId, limit, page});

  if (getPhotos?.error) {
    return res.status(500).json({ error: getPhotos.error.message });
  }

  return res.status(200).json(getPhotos);
};

module.exports = getPhotos;
