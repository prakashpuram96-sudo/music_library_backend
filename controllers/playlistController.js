const playlistService = require("../services/playlistService");
const createPlaylistDto = require("../dtos/createPlaylistDto");

const createPlaylist = async (req, res) => {
  const { errors, data } = createPlaylistDto(req.body);
  if (errors.length > 0) return res.status(400).json({ message: errors[0] });
  try {
    const playlist = await playlistService.createPlaylist(
      data.name,
      req.user._id
    );
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... rest stays same as before
const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await playlistService.getMyPlaylists(req.user._id);
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await playlistService.getPlaylistById(
      req.params.id,
      req.user._id
    );
    res.json(playlist);
  } catch (error) {
    const status = error.message === "Not authorized" ? 403 : 404;
    res.status(status).json({ message: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.updatePlaylist(
      req.params.id,
      req.user._id,
      req.body.name
    );
    res.json(playlist);
  } catch (error) {
    const status = error.message === "Not authorized" ? 403 : 404;
    res.status(status).json({ message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const result = await playlistService.deletePlaylist(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (error) {
    const status = error.message === "Not authorized" ? 403 : 404;
    res.status(status).json({ message: error.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.addSongToPlaylist(
      req.params.id,
      req.params.songId,
      req.user._id
    );
    res.json(playlist);
  } catch (error) {
    const status =
      error.message === "Not authorized"
        ? 403
        : error.message === "Song already in playlist"
        ? 400
        : 404;
    res.status(status).json({ message: error.message });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.removeSongFromPlaylist(
      req.params.id,
      req.params.songId,
      req.user._id
    );
    res.json(playlist);
  } catch (error) {
    const status = error.message === "Not authorized" ? 403 : 404;
    res.status(status).json({ message: error.message });
  }
};

const searchSongsInPlaylist = async (req, res) => {
  try {
    const songs = await playlistService.searchSongsInPlaylist(
      req.params.id,
      req.user._id,
      req.query.query
    );
    res.json(songs);
  } catch (error) {
    const status = error.message === "Not authorized" ? 403 : 404;
    res.status(status).json({ message: error.message });
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
