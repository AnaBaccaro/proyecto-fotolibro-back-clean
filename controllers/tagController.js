const { Tag } = require("../models");

async function store(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  // Opcional: prevenir duplicados si tenés constraint
  const [tag, created] = await Tag.findOrCreate({
    where: { name },
  });

  if (!created) {
    return res.status(409).json({ error: "Etiqueta ya existe" });
  }

  res.status(201).json(tag);
}

async function index(req, res) {
  const tags = await Tag.findAll();
  res.json(tags);
}

async function destroy(req, res) {
  const tag = await Tag.findByPk(req.params.id);
  if (!tag) {
    return res.status(404).json({ error: "Etiqueta no encontrada" });
  }
  await tag.destroy();
  res.json({ message: "Etiqueta eliminada con éxito" });
}

module.exports = {
  store,
  index,
  destroy,
};
