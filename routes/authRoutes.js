const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'AlgoSuperSecreto';

// Ruta login admin
router.post("/login", async (req, res) => {
  const { user, password } = req.body;

  // Usuario hardcodeado
  const adminUser = {
    user: "admin",
    password: "admin123"
  };

  if (!user || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  if (user !== adminUser.user || password !== adminUser.password) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const payload = {
    user: adminUser.username,
    role: "admin",
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;
