const { sequelize } = require("./models");

const seedAuthors = require("./authorSeeder");
const seedPhotobooks = require("./photobookSeeder");
const seedPhotobookImages = require("./photobookImageSeeder");
const seedUsers = require("./userSeeder");

async function runSeeders() {
  console.log("🚀 Iniciando seeders custom...");

  await sequelize.sync({ alter: true });

  // ⚠️ Opcional: limpiar tablas antes
  await sequelize.models.Photobook.destroy({ where: {} });
  await sequelize.models.Author.destroy({ where: {} });

  await seedAuthors();
  await seedPhotobooks();
  await seedPhotobookImages();
  await seedUsers();

  console.log("✅ Todos los seeders ejecutados correctamente");

  process.exit();
}

runSeeders();
