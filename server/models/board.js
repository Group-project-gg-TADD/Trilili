"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.hasMany(models.List, { foreignKey: "boardId" });
      Board.belongsTo(models.User, { foreignKey: "ownerId" });
      Board.hasMany(models.BoardMember, { foreignKey: "boardId" });
    }
  }
  Board.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Board name is required",
          },
          notEmpty: {
            msg: "Board name is required",
          },
        },
      },
      ownerId: {
        type: DataTypes.INTEGER, //user id
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Board",
    }
  );
  return Board;
};
