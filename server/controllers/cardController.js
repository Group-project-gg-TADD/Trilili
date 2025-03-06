const { Card } = require("../models/index");

class cardController {
  static async getCard(req, res, next) {
    try {
      const { listId } = req.params;
      const data = await Card.findAll({
        where: {
          listId: listId,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addCard(req, res, next) {
    try {
      const { listId } = req.params;
      const { title, description } = req.body;
      const data = await Card.create({
        title,
        description,
        listId,
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateCard(req, res, next) {
    try {
      const { id } = req.params;
      const { targetList } = req.body;
      const data = await Card.update(
        {
          listId: +targetList,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      res.status(200).json(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = cardController;
