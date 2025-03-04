const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return next({ name: "Unauthorized", message: "Invalid token" });
    }

    const [type, token] = bearerToken.split(" ");
    if (type !== "Bearer" || !token) {
      return next({ name: "Unauthorized", message: "Invalid token" });
    }

    const openToken = verifyToken(token);

    const user = await User.findByPk(openToken.id);
    if (!user) {
      return next({ name: "Unauthorized", message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
