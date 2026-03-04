const { Sequelize, DataTypes } = require("sequelize");

// 1) Conexión simple
const sequelize = new Sequelize("fotolibros", "root", "rootroot", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: console.log, // muestra la query que se ejecuta
});

// 2) Modelo mínimo para photobooks
const Photobook = sequelize.define(
  "Photobook",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    author_name: DataTypes.STRING,
    author_lastname: DataTypes.STRING,
    is_featured: DataTypes.BOOLEAN,
    is_curated: DataTypes.BOOLEAN,
  },
  { tableName: "photobooks", timestamps: false }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión OK a la DB");

    const books = await Photobook.findAll({ limit: 10 });
    console.log("Libros encontrados:", books.length);
    console.log(books.map(b => b.toJSON()));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await sequelize.close();
  }
})();
