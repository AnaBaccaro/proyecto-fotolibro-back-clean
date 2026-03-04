const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "AlgoSuperSecreto";

async function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({ status: 401, message: "Token no provisto" });
  }

  const token = authHeader.split(" ")[1];

  // Esta parte puede lanzar error, pero lo delegamos con next
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next({ status: 403, message: "Token inválido o expirado" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticateAdmin;
