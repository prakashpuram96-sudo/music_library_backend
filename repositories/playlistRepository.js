const Playlist = require("../models/Playlist");

const create = (data) => Playlist.create(data);
const findByUser = (userId) =>
  Playlist.find({ user: userId }).populate("songs");
const findById = (id) => Playlist.findById(id);
const findByIdPopulated = (id) => Playlist.findById(id).populate("songs");
const save = (playlist) => playlist.save();
const deleteOne = (playlist) => playlist.deleteOne();

module.exports = {
  create,
  findByUser,
  findById,
  findByIdPopulated,
  save,
  deleteOne,
};
