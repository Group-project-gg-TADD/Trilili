const {Card} = require('../models/index');

class cardController {
    static async getCard(req,res,next){
        try {
            const {listId} = req.params;
            const data = await Card.findAll({
                where: {
                    ListId: listId
                }
            });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async addCard (req,res,next){
        try {
            const {listId} = req.params
            const {title, description, dueDate, status} = req.body
            const data = await Card.create({
                title,
                description,
                listId,
                dueDate,
                status
            })
            res.status(201).json(data)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = cardController;