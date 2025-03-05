'use strict';
const { Model } = require('sequelize');
const loadGemini = require('../helpers/geminiAi');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.List, { foreignKey: "listId" });
    }
  }
  Comment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    hooks: {
      beforeCreate: async (comment) => {
        const gemini = await loadGemini();
        const prompt = 'Could you pls transform below comments to be more corporate friendly and perhaps more productive/constructive?'
        const result = await gemini.generateContent([prompt, comment.content]);
        comment.content = result.response.text();
      }
    }
  });
  return Comment;
};