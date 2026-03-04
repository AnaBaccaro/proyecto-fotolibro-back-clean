const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");


router.get("/", authenticateToken, authorizeRoles("admin"), tagController.index);
router.post("/", authenticateToken, authorizeRoles("admin"), tagController.store);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), tagController.destroy);

module.exports = router;
