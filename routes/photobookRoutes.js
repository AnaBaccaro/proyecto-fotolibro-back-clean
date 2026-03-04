const express = require("express");
const router = express.Router();

const {
  getAll,
  getLatest,
  getCurated,
  search,
  getById,
} = require("../controllers/photobookController");

router.get("/buscar", search);
router.get("/curated", getCurated);
router.get("/latest", getLatest);
router.get("/:id", getById);
router.get("/", getAll);

module.exports = router;
