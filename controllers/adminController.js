const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ where: { email } });

  if (!admin) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ message: "Login exitoso", token });
}

async function profile(req, res) {
  const admin = await Admin.findByPk(req.user.id);

  if (!admin) {
    return res.status(404).json({ error: "Admin no encontrado" });
  }

  res.json({ id: admin.id, email: admin.email });
}

module.exports = {
  login,
  profile,
};
