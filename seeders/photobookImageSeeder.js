const photobooks = require("../data/photobooks_argentina_clean.json");
const { Photobook, PhotobookImage } = require("../models");

module.exports = async () => {
  for (const p of photobooks) {
    if (!p["Imagen"] || !p["Libro"]) continue;

    const photobook = await Photobook.findOne({
      where: { title: p["Libro"] },
    });

    if (!photobook) continue;

    await PhotobookImage.create({
      photobookId: photobook.id,
      image_url: `/img/${p["Imagen"]}`,
      alt_text: p["Libro"],
      order: 1,
    });
  }

  console.log("🖼️ Imágenes cargadas correctamente");
};
