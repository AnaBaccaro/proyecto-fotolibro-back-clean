const { Photobook } = require("../models");
const photobooksRaw = require("../data/photobooks_argentina_clean.json");

async function seedPhotobooks() {
  const formattedPhotobooks = photobooksRaw.map((item) => ({
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
  }));

  await Photobook.bulkCreate(formattedPhotobooks);
  console.log("Photobooks seeded correctamente!");
}

module.exports = seedPhotobooks;
