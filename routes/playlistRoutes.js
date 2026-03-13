const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  searchSongsInPlaylist,
} = require("../controllers/playlistController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPlaylist);
router.get("/", protect, getMyPlaylists);
router.get("/:id", protect, getPlaylistById);
router.put("/:id", protect, updatePlaylist);
router.delete("/:id", protect, deletePlaylist);
router.post("/:id/songs/:songId", protect, addSongToPlaylist);
router.delete("/:id/songs/:songId", protect, removeSongFromPlaylist);
router.get("/:id/search", protect, searchSongsInPlaylist);

module.exports = router;
