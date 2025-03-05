'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.belongsTo(models.Board, { foreignKey: "boardId" });
      List.hasMany(models.Card, { foreignKey: "listId" });
      List.hasMany(models.Comment, { foreignKey: "listId" });
    }
  }
  List.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "List name is required"
        },
        notEmpty: {
          msg: "List name is required"
        },
      }
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};