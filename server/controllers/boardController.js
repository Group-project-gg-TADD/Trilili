const { Board, BoardMember, User, List } = require("../models");

class boardController {
  static async getBoardMember(req, res, next) {
    try {
      const data = await BoardMember.findAll({
        where: { userId: req.user.id },
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addBoard(req, res, next) {
    try {
      const { name } = req.body;
      const ownerId = req.user.id;

      if (!name) {
        return res.status(400).json({ message: "Board name is required" });
      }

      const newBoard = await Board.create({ name, ownerId });
      res.status(201).json(newBoard);
    } catch (error) {
      next(error);
    }
  }

  static async getBoards(req, res, next) {
    try {
      // const userId = req.user.id;

      const boards = await Board.findAll({
        where: {
          ownerId: req.user.id,
        },
        include: {
          model: List,
        },
      });

      res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  }

  static async getBoardById(req, res, next) {
    try {
      const { id } = req.params;
      const board = await Board.findByPk(id, {
        include: [{ model: BoardMember, include: [User] }, { model: List }],
      });

      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async addBoardMember(req, res, next) {
    try {
      const { boardId, userId } = req.body;

      // Cek apakah board ada
      const board = await Board.findByPk(boardId);
      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      // Cek apakah user sudah menjadi member board
      const existingMember = await BoardMember.findOne({
        where: { boardId, userId },
      });

      if (existingMember) {
        return res
          .status(400)
          .json({ message: "User is already a member of this board" });
      }

      // Tambahkan user sebagai member
      await BoardMember.create({ boardId, userId });
      res.status(201).json({ message: "Member added to board" });
    } catch (error) {
      next(error);
    }
  }

  static async getBoardByIdMembers(req, res, next) {
    try {
      const boardMembers = await BoardMember.findAll({
        where: { userId: req.user.id },
        include: Board,
      });

      res.status(200).json(boardMembers);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = boardController;
