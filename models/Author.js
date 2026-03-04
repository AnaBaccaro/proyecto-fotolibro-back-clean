// models/Author.js
module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");

  const Author = sequelize.define("Author", {
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Author;
};
