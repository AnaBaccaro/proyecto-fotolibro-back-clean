// models/index.js
require("dotenv").config();
const Sequelize = require("sequelize");
const config = require("../config/config.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  }
);

// Importar modelos (PASANDO Sequelize)
const Photobook = require("./Photobook")(sequelize, Sequelize);
const Author = require("./Author")(sequelize, Sequelize);

module.exports = {
  sequelize,
  Sequelize,
  Photobook,
  Author,
};
