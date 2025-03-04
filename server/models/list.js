'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      List.belongsTo(models.Card, { foreignKey: "listId" })
      List.hasMany(models.Board, {foreignKey: "boardId"})
    }
  }
  List.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        }, 
      }
    },
    boardId:  {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};