const fs = require("fs");
const path = require("path");

// archivo original
const inputPath = path.join(__dirname, "../data/photobooks_argentina.json");
// archivo limpio
const outputPath = path.join(__dirname, "../data/photobooks_argentina_clean.json");

// leer JSON
const raw = fs.readFileSync(inputPath, "utf-8");
const data = JSON.parse(raw);

// función de limpieza
function sanitize(value) {
  if (value === "NaN") return null;
  if (value === "") return null;
  if (typeof value === "number" && !Number.isFinite(value)) return null;
  return value;
}

// limpiar cada objeto
const cleaned = data.map((item) => {
  const cleanItem = {};
  for (const key in item) {
    cleanItem[key] = sanitize(item[key]);
  }
  return cleanItem;
});

// guardar archivo nuevo
fs.writeFileSync(
  outputPath,
  JSON.stringify(cleaned, null, 2),
  "utf-8"
);

console.log("✅ JSON limpiado correctamente");
console.log("📁 Archivo creado:", outputPath);
