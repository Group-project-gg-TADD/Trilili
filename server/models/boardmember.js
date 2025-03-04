'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardMember extends Model {
    static associate(models) {
      BoardMember.belongsTo(models.Board, {foreignKey: "boardId"})
      BoardMember.belongsTo(models.User, {foreignKey: "userId"})
    }
  }
  BoardMember.init({
    userId: {
      type: DataTypes.INTEGER, //user id
      allowNull: false
    },
    boardId: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BoardMember',
  });
  return BoardMember;
};