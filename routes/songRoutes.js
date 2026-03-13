const express = require("express");
const router = express.Router();
const {
  addSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  toggleVisibility,
  searchSongs,
} = require("../controllers/songController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/search", protect, searchSongs);
router.get("/", protect, getAllSongs);
router.get("/:id", protect, getSongById);
router.post("/", protect, adminOnly, addSong);
router.put("/:id", protect, adminOnly, updateSong);
router.delete("/:id", protect, adminOnly, deleteSong);
router.put("/:id/visibility", protect, adminOnly, toggleVisibility);

module.exports = router;
