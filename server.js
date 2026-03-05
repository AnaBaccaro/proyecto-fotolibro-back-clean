const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

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

// ✅ endpoint mínimo para saber si levanta
app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// ✅ debug para ver si existe el JSON en Vercel
app.get("/__debug", (req, res) => {
  const dataPath = path.join(__dirname, "data", "photobooks_argentina_clean.json");

  res.json({
    cwd: process.cwd(),
    __dirname,
    dataPath,
    dataExists: fs.existsSync(dataPath),
  });
});

// ⚠️ IMPORTANTE: requerimos routes DESPUÉS del healthcheck
// (si algo en routes/controllers crashea, al menos / y /__debug deberían vivir)
let photobookRoutes = null;
try {
  photobookRoutes = require("./routes/photobookRoutes");
} catch (e) {
  // NO te gusta try/catch, pero acá es la única forma de que /__debug te muestre algo
  // sin esto, la function muere y no vemos el error.
  app.get("/__routes_error", (req, res) => {
    res.status(500).json({
      error: "Failed to require ./routes/photobookRoutes",
      message: e.message,
    });
  });
}

if (photobookRoutes) {
  app.use("/fotolibros", photobookRoutes);
}

module.exports = app;