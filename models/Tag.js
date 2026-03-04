const { Model, DataTypes } = require("sequelize");

class Tag extends Model {
  static initModel(sequelize) {
    Tag.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "tag", 
        tableName: "tags", 
        timestamps: false, // si no querés createdAt/updatedAt
      }
    );

    return Tag; 
  }
  static associate(models) {
    Tag.belongsToMany(models.Photobook, {
      through: 'photobook_tags',
      foreignKey: 'tagId',
      otherKey: 'photobookId',
    });
  }
}

module.exports = Tag;
