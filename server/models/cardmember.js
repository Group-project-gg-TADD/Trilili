'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardMember extends Model {

    static associate(models) {
      CardMember.belongsTo(models.Card, { foreignKey: "cardId" })
      CardMember.belongsTo(models.User, { foreignKey: "userId" })
    }
  }
  CardMember.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CardMember',
  });
  return CardMember;
};