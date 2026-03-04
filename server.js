const express = require("express");
const cors = require("cors");
const photobookRoutes = require("./routes/photobookRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://proyectofotolibro.com",
      "https://www.proyectofotolibro.com",
    ],
  })
);

app.use(express.json());

app.use("/fotolibros", photobookRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}