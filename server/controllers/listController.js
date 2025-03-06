const { List, Card, Board } = require("../models");

class listController {
  static async getList(req, res, next) {
    try {
      const { boardId } = req.params;
      const board = await Board.findByPk(boardId);

      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      const lists = await List.findAll({
        where: { boardId },
        include: { model: Card },
        order: [["id", "ASC"]],
      });
      res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  }

  static async addList(req, res, next) {
    try {
      const { boardId } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "List name is required" });
      }

      const board = await Board.findByPk(boardId);
      if (!board) {
        return res.status(404).json({ messae: "Board not found" });
      }

      const newList = await List.create({ name, boardId });
      res.status(201).json(newList);
    } catch (error) {
      next(error);
    }
  }
  static async deleteList(req,res,next){
    try {
      const { id } = req.params;
      const list = await List.findByPk(id);
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }
      await list.destroy();
      res.status(200).json({ message: "List deleted" });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = listController;
