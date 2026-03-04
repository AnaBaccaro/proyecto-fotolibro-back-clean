"use strict";

const photobooks = require("../data/photobooks_argentina_clean.json");

// 👇 títulos que querés mostrar como novedades
const FEATURED_TITLES = [
  "La Ausencia",
  "Las Batallas de Monte Chingolo",
  "La Quinta Copia",
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = photobooks.map((p) => ({
      type: p.type || "Fotolibro",

      author_name: p.author_name || "",
      author_lastname: p.author_lastname || "",

      title: p.title || "",
      country: p.country || "",
      city: p.city || "",
      publisher: p.publisher || "",

      year: p.year ? Number(p.year) : null,

      text: p.text || "",
      design: p.design || "",
      edition: p.edition || "",
      copies: p.copies || "",
      isbn: p.isbn || "",
      pages: p.pages || "",
      dimensions: p.dimensions || "",
      language: p.language || "",
      funding: p.funding || "",
      printer: p.printer || "",
      bibliography: p.bibliography || "",
      comments: p.comments || "",
      link: p.link || "",

      // ⭐ CLAVE ABSOLUTA
      is_featured: FEATURED_TITLES.includes(p.title),

      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("photobooks", rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("photobooks", null, {});
  },
};
