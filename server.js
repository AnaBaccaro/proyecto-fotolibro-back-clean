const express = require("express");
const cors = require("cors");
const photobookRoutes = require("./routes/photobookRoutes");

const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      // Permitir requests sin origin (curl, server-to-server)
      if (!origin) return cb(null, true);

      const allowed = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://proyectofotolibro.com",
        "https://www.proyectofotolibro.com",
      ];

      // Permitir previews de Vercel del front
      const isVercelPreview =
        origin.endsWith(".vercel.app") || origin.endsWith(".vercel.app/");

      if (allowed.includes(origin) || isVercelPreview) return cb(null, true);

      return cb(new Error("Not allowed by CORS"));
    },
    credentials: false,
  })
);