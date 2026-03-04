const { Model, DataTypes } = require("sequelize");

class PhotobookImage extends Model {
  static initModel(sequelize) {
    PhotobookImage.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        photobookId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        alt_text: {
          type: DataTypes.STRING,
        },
        order: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "PhotobookImage",
        tableName: "photobook_images",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    PhotobookImage.belongsTo(models.Photobook, {
      foreignKey: "photobookId",
      as: "photobook",
    });
  }
}

module.exports = PhotobookImage;
