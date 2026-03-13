const Song = require("../models/Song");
const { createNotificationsForAllUsers } = require("./notificationController");
const addSong = async (req, res) => {
  const { title, singer, musicDirector, album, releaseDate, url, coverImage } =
    req.body;
  try {
    const song = await Song.create({
      title,
      singer,
      musicDirector,
      album,
      releaseDate,
      url,
      coverImage,
    });
    // Create notifications for all users
    await createNotificationsForAllUsers(song);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { isVisible: true };
    const songs = await Song.find(filter).sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleVisibility = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    song.isVisible = !song.isVisible;
    await song.save();
    res.json({
      message: `Song is now ${song.isVisible ? "visible" : "hidden"}`,
      song,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSongs = async (req, res) => {
  const { query } = req.query;
  try {
    const songs = await Song.find({
      isVisible: true,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { singer: { $regex: query, $options: "i" } },
        { musicDirector: { $regex: query, $options: "i" } },
        { album: { $regex: query, $options: "i" } },
      ],
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  toggleVisibility,
  searchSongs,
};
