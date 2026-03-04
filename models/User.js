const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        user: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "user",
        },
      },
      {
        sequelize,
        modelName: "User", // conviene usar PascalCase aquí y que Sequelize pluralice automáticamente
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
              user.password = await bcrypt.hash(user.password, saltRounds);
            }
          },
          beforeBulkCreate: async (users) => {
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
            await Promise.all(
              users.map(async (user) => {
                if (user.password) {
                  user.password = await bcrypt.hash(user.password, saltRounds);
                }
              })
            );
          },
        },
      }
    );
    return User;
  }
}

module.exports = User;
