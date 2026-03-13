const songRepo = require("../repositories/songRepository");
const notifService = require("./notificationService");

const addSong = async (data) => {
  const song = await songRepo.create(data);
  await notifService.createNotificationsForAllUsers(song);
  return song;
};

const getAllSongs = async (role) => {
  const filter = role === "admin" ? {} : { isVisible: true };
  return songRepo.findAll(filter);
};

const getSongById = async (id) => {
  const song = await songRepo.findById(id);
  if (!song) throw new Error("Song not found");
  return song;
};

const updateSong = async (id, data) => {
  const song = await songRepo.updateById(id, data);
  if (!song) throw new Error("Song not found");
  return song;
};

const deleteSong = async (id) => {
  const song = await songRepo.deleteById(id);
  if (!song) throw new Error("Song not found");
  return { message: "Song deleted successfully" };
};

const toggleVisibility = async (id) => {
  const song = await songRepo.findById(id);
  if (!song) throw new Error("Song not found");
  song.isVisible = !song.isVisible;
  await song.save();
  return {
    message: `Song is now ${song.isVisible ? "visible" : "hidden"}`,
    song,
  };
};

const searchSongs = async (query) => songRepo.search(query);

module.exports = {
  addSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  toggleVisibility,
  searchSongs,
};
