const Playlist = require("../models/Playlist");

const createPlaylist = async (req, res) => {
  const { name } = req.body;
  try {
    const playlist = await Playlist.create({ name, user: req.user._id });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).populate(
      "songs"
    );
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    playlist.name = req.body.name || playlist.name;
    await playlist.save();
    const updated = await Playlist.findById(playlist._id).populate("songs");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    await playlist.deleteOne();
    res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    if (playlist.songs.includes(req.params.songId))
      return res.status(400).json({ message: "Song already in playlist" });
    playlist.songs.push(req.params.songId);
    await playlist.save();
    const updated = await Playlist.findById(playlist._id).populate("songs");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    playlist.songs = playlist.songs.filter(
      (song) => song.toString() !== req.params.songId
    );
    await playlist.save();
    res.json(await playlist.populate("songs"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSongsInPlaylist = async (req, res) => {
  const { query } = req.query;
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });
    if (playlist.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    const filtered = playlist.songs.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  searchSongsInPlaylist,
};
