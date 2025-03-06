'use strict';
const { Model } = require('sequelize');
const loadGemini = require('../helpers/geminiAi');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.Board, { foreignKey: "boardId" }); // Changed from List to Board
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
    boardId: { // Changed from listId to boardId
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    hooks: {
      beforeCreate: async (comment) => {
        const gemini = await loadGemini();
        const prompt = `Below is a text in either Bahasa Indonesia or Indonesian Slang. Please transform it to be more corporate-friendly and constructive. Return the result in one sentence in Bahasa Indonesia. If there is no clear meaning, return the original text. If it's highly offensive, return 'Saya ingin berkata kasar'.
  Text: "${comment.content}"`;
        const result = await gemini.generateContent([prompt, comment.content]);
        comment.content = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || comment.content;
      }
    }
  });
  return Comment;
};