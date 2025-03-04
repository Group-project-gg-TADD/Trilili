'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {

    static associate(models) {
      Card.hasMany(models.List, { foreignKey: "listId" })

    }
  }
  Card.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title is required"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is required"
        },
        notEmpty: {
          msg: "Description is required"
        }, 
      }
    },
    listId: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "To Do"
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};