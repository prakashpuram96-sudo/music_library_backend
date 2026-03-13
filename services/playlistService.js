const playlistRepo = require("../repositories/playlistRepository");

const createPlaylist = async (name, userId) =>
  playlistRepo.create({ name, user: userId });

const getMyPlaylists = async (userId) => playlistRepo.findByUser(userId);

const getPlaylistById = async (id, userId) => {
  const playlist = await playlistRepo.findByIdPopulated(id);
  if (!playlist) throw new Error("Playlist not found");
  if (playlist.user.toString() !== userId.toString())
    throw new Error("Not authorized");
  return playlist;
};

const updatePlaylist = async (id, userId, name) => {
  const playlist = await playlistRepo.findById(id);
  if (!playlist) throw new Error("Playlist not found");
  if (playlist.user.toString() !== userId.toString())
    throw new Error("Not authorized");
  playlist.name = name || playlist.name;
  await playlistRepo.save(playlist);
  return playlistRepo.findByIdPopulated(id);
};

const deletePlaylist = async (id, userId) => {
  const playlist = await playlistRepo.findById(id);
  if (!playlist) throw new Error("Playlist not found");
  if (playlist.user.toString() !== userId.toString())
    throw new Error("Not authorized");
  await playlistRepo.deleteOne(playlist);
  return { message: "Playlist deleted successfully" };
};

const addSongToPlaylist = async (id, songId, userId) => {
  const playlist = await playlistRepo.findById(id);
  if (!playlist) throw new Error("Playlist not found");
  if (playlist.user.toString() !== userId.toString())
    throw new Error("Not authorized");
  if (playlist.songs.includes(songId))
    throw new Error("Song already in playlist");
  playlist.songs.push(songId);
  await playlistRepo.save(playlist);
  return playlistRepo.findByIdPopulated(id);
};

const removeSongFromPlaylist = async (id, songId, userId) => {
  const playlist = await playlistRepo.findById(id);
  if (!playlist) throw new Error("Playlist not found");
  if (playlist.user.toString() !== userId.toString())
    throw new Error("Not authorized");
  playlist.songs = playlist.songs.filter((s) => s.toString() !== songId);
  await playlistRepo.save(playlist);
  return playlistRepo.findByIdPopulated(id);
};

const searchSongsInPlaylist = async (id, userId, query) => {
  const playlist = await playlistRepo.findByIdPopulated(id);
  if (!playlist) throw new Error("Playlist not found");
  if (playlist.user.toString() !== userId.toString())
    throw new Error("Not authorized");
  return playlist.songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );
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
