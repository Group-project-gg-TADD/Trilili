const { Board, BoardMember, User, List } = require("../models");

class boardController {
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

  static async addBoardMember(req, res, next) {
    try {
      const { boardId, userId } = req.body;

      const board = await Board.findByPk(boardId);
      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await BoardMember.create({ boardId, userId });
      res.status(201).json({ message: "Member added to board" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = boardController;
