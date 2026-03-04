const photobooksRaw = require("../data/photobooks_argentina_clean.json");
const fs = require("fs");
const path = require("path");

const IMG_DIR = path.join(__dirname, "..", "public", "img");

const truthy = (v) => {
  if (v === true) return true;
  if (typeof v === "number") return v === 1;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "yes" || s === "y" || s === "si" || s === "sí";
  }
  return false;
};

const getField = (b, key) => {
  if (!b || typeof b !== "object") return undefined;
  if (Object.prototype.hasOwnProperty.call(b, key)) return b[key];
  const foundKey = Object.keys(b).find(
    (k) => k.trim().toLowerCase() === key.trim().toLowerCase()
  );
  return foundKey ? b[foundKey] : undefined;
};

const norm = (v) =>
  (v ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const normalizeName = (s) => (s || "").toString().trim().toLowerCase().normalize("NFC");

const stripExt = (filename) => filename.replace(/\.[^/.]+$/, "");

const resolveRealImageName = (imgName, files) => {
  const raw = (imgName ?? "").toString().trim();
  if (!raw) return "";

  const low = raw.toLowerCase();
  if (low === "null" || low === "undefined") return "";

  const base = normalizeName(stripExt(raw));
  const match = files.find((f) => normalizeName(stripExt(f)) === base);
  return match || "";
};

const imgFiles = (() => {
  try {
    return fs.readdirSync(IMG_DIR);
  } catch {
    return [];
  }
})();

const photobooks = photobooksRaw.map((b, i) => {
  const resolved = resolveRealImageName(getField(b, "Imagen"), imgFiles);

  return {
    id: i + 1,
    ...b,
    Imagen: resolved,
  };
});

const hasRealImage = (b) => {
  const img = (b?.Imagen ?? "").toString().trim();
  return img.length > 0;
};

const parseTags = (b) => {
  const raw = getField(b, "Tags") ?? getField(b, "tags") ?? getField(b, "Tag") ?? getField(b, "tag") ?? "";

  if (Array.isArray(raw)) {
    return raw.map((t) => (t ?? "").toString().trim()).filter(Boolean);
  }

  const s = (raw ?? "").toString().trim();
  if (!s) return [];
  return s
    .split(/[,;\n]/g)
    .map((t) => t.trim())
    .filter(Boolean);
};

exports.getAll = async (req, res) => {
  res.json(photobooks);
};

exports.getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1 || id > photobooks.length) {
    return res.status(404).json({ error: "Fotolibro no encontrado" });
  }

  res.json(photobooks[id - 1]);
};

exports.getLatest = async (req, res) => {
  const latest = photobooks.filter(hasRealImage).slice(-3).reverse();
  res.json(latest);
};

exports.getCurated = async (req, res) => {
  const curated = photobooks
    .filter((b) => truthy(getField(b, "Curated")) && hasRealImage(b))
    .sort(
      (a, b) =>
        (Number(getField(a, "CuratedOrder")) || 999999) -
        (Number(getField(b, "CuratedOrder")) || 999999)
    )
    .slice(0, 9);

  res.json(curated);
};

exports.search = async (req, res) => {
  const q = norm(req.query.q || "");
  if (!q) return res.json([]);

  const results = photobooks.filter((b) => {
    const title = getField(b, "Titulo") ?? getField(b, "Título") ?? "";
    const first = getField(b, "Nombre fotografe") ?? getField(b, "Nombre fotógrafe") ?? "";
    const last = getField(b, "Apellido fotografe") ?? getField(b, "Apellido fotógrafe") ?? "";
    const author = `${first} ${last}`.trim();

    const country = getField(b, "Pais") ?? getField(b, "País") ?? "";
    const city = getField(b, "Ciudad") ?? "";
    const editorial = getField(b, "Editorial") ?? "";
    const tags = parseTags(b).join(" ");

    const haystack = norm(`${title} ${author} ${country} ${city} ${editorial} ${tags}`);
    return haystack.includes(q);
  });

  res.json(results.slice(0, 50));
};