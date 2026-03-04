const { sequelize, Photobook } = require("../models");

const FEATURED_TITLES = [
  "Metrópolis",
  "En el medio censurada",
  "Archivo de la Memoria Trans Argentina",
];

const normalize = (str) =>
  str ? str.trim().toLowerCase() : "";

(async () => {
  const photobooks = await Photobook.findAll();

  for (const book of photobooks) {
    const shouldBeFeatured = FEATURED_TITLES
      .map(normalize)
      .includes(normalize(book.title));

    if (shouldBeFeatured) {
      await book.update({ is_featured: true });
    }
  }

  console.log("Featured actualizados");
  process.exit();
})();
