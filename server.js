const express = require("express");
const cors = require("cors");
const photobookRoutes = require("./routes/photobookRoutes");

const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      const allowed = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://proyectofotolibro.com",
        "https://www.proyectofotolibro.com",
      ];

      if (allowed.includes(origin)) return cb(null, true);
      if (origin.endsWith(".vercel.app")) return cb(null, true);

      return cb(null, false);
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.use("/fotolibros", photobookRoutes);

// ✅ CLAVE: exportar una function (handler) para Vercel
module.exports = (req, res) => {
  return app(req, res);
};