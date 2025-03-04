const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
class Controller {
  static async register(req, res, next) {
    try {
      const data = await User.create(req.body);
      res.status(201).json({ id: data.id, name: data.name, email: data.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const cekPassword = comparePassword(password, user.password);
      if (!cekPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const token = signToken({ id: user.id });
      res.json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
  static async addBoard(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async getBoard(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
