const {List, Board} = require("../models")

class listController{
    static async getList(req, res, next){
        try {
            const {boardId} = req.params
            const board = await Board.findByPK(boardId)

            if(!board){
                return res.status(404).json({message: "Board not found"})
            }

            const lists = await List.findAll({
                where: {boardId}
            })
            res.status(200).json(lists)
        } catch (error) {
            next(error)
        }
    }

    static async addList(req, res, next){
        try {
            const {boardId} = req.params
            const {name} = req.body

            if(!name){
                return res.status(400)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = listController