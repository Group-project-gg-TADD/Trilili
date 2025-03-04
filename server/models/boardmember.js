'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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