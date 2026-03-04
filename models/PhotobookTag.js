const { Model, DataTypes } = require("sequelize");

class PhotobookTag extends Model {
  static initModel(sequelize) {
    PhotobookTag.init(
      {
        photobookId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: "photobooks",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        tagId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: "tags",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "photobook_tag",
        tableName: "photobook_tags",
        timestamps: false,
      }
    );

    return PhotobookTag;
  }
}

module.exports = PhotobookTag;
