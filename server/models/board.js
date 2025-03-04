'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Board.hasMany(models.List, {foreignKey: "boardId"})
      Board.belongsTo(models.User, {foreignKey: "userId"})
      Board.hasMany(models.BoardMember, {foreignKey: "boardId"})
    }
  }
  Board.init({
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
    ownerId: {
      type: DataTypes.INTEGER, //user id
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};