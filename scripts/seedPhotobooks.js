const { Photobook, sequelize } = require("../models");
const photobooksData = require("../data/photobooks_argentina_clean.json");

// ⭐ Títulos que querés marcar como novedades
const FEATURED_TITLES = [
  "La Ausencia",
  "Las Batallas de Monte Chingolo",
  "La Quinta Copia",
];

async function runSeed() {
  await sequelize.sync({ alter: true });
  console.log("Base sincronizada");

  await Photobook.destroy({ where: {} });
  console.log("Tabla photobooks limpiada");

  const rows = photobooksData.map((item) => ({
    nombreFotografe: item["Nombre fotógrafe"] || null,
    apellidoFotografe: item["Apellido fotógrafe"] || null,
    titulo: item["Título"] || null,
    pais: item["País"] || null,
    ciudad: item["Ciudad"] || null,
    editorial: item["Editorial"] || null,
    ano: item["Año"] || null,
    texto: item["Texto"] || null,
    diseno: item["Diseño"] || null,
    edicion: item["Edición"] || null,
    copias: item["Copias"] || null,
    isbn: item["ISBN"] || null,
    paginas: item["# págs"] || null,
    medidas: item["Medidas"] || null,
    idioma: item["Idioma"] || null,
    financiacion: item["Financiación"] || null,
    imprenta: item["Imprenta"] || null,
    biblio: item["Biblio"] || null,
    comentarios: item["Comentarios"] || null,
    link: item["Link"] || null,
    imagen: item["Imagen"] || null,

    curated: item["Curated"] || false,
    curatedOrder: item["CuratedOrder"] || null,

    isFeatured: FEATURED_TITLES.includes(item["Título"]),
  }));

  await Photobook.bulkCreate(rows);

  console.log("Photobooks insertados correctamente");
  process.exit();
}

runSeed();
