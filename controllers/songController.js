const songService = require("../services/songService");
const createSongDto = require("../dtos/createSongDto");

const addSong = async (req, res) => {
  const { errors, data } = createSongDto(req.body);
  if (errors.length > 0) return res.status(400).json({ message: errors[0] });
  try {
    const song = await songService.addSong(data);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs(req.user.role);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await songService.getSongById(req.params.id);
    res.json(song);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateSong = async (req, res) => {
  try {
    const song = await songService.updateSong(req.params.id, req.body);
    res.json(song);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const result = await songService.deleteSong(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const toggleVisibility = async (req, res) => {
  try {
    const result = await songService.toggleVisibility(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const searchSongs = async (req, res) => {
  try {
    const songs = await songService.searchSongs(req.query.query);
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
