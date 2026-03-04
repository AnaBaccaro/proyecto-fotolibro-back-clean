const { User } = require("../models");

exports.index = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] }, // no devolver password
  });
  res.json(users);
};

exports.create = (req, res) => {
  res.json({ message: "Formulario de creación de usuario" });
};

exports.store = async (req, res) => {
  const { user, email, password, role } = req.body;

  if (!user || !email || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios: username, email o password" });
  }

  // opcional: podrías chequear unicidad antes de crear
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email ya registrado" });
  }

  const newUser = await User.create({
    user,
    email,
    password, // si tenés hook en el modelo se hasheará automáticamente
    role: role || "user",
  });

  const safe = newUser.toJSON();
  delete safe.password;

  res.status(201).json(safe);
};

exports.show = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
};

exports.edit = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ message: "Formulario de edición", user });
};

exports.update = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const { username, email, role } = req.body;

  // Armamos el objeto solo con lo que llega
  const toUpdate = {};
  if (username !== undefined) toUpdate.username = username;
  if (email !== undefined) toUpdate.email = email;
  if (role !== undefined) toUpdate.role = role;

  await user.update(toUpdate);

  const safe = user.toJSON();
  delete safe.password;
  res.json(safe);
};

exports.destroy = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  await user.destroy();
  res.json({ message: "Usuario eliminado" });
};
