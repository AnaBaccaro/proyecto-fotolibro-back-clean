const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// Rutas protegidas del panel admin
router.get("/", authenticateToken, userController.index);
router.get("/crear", authenticateToken, userController.create);
router.post("/", authenticateToken, userController.store);
router.get("/:id", authenticateToken, userController.show);
router.get("/:id/editar", authenticateToken, userController.edit);
router.patch("/:id", authenticateToken, userController.update);
router.delete("/:id", authenticateToken, userController.destroy);

module.exports = router;
