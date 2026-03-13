const Song = require("../models/Song");

const create = (data) => Song.create(data);
const findAll = (filter = {}) => Song.find(filter).sort({ createdAt: -1 });
const findById = (id) => Song.findById(id);
const updateById = (id, data) =>
  Song.findByIdAndUpdate(id, data, { new: true });
const deleteById = (id) => Song.findByIdAndDelete(id);
const search = (query) =>
  Song.find({
    isVisible: true,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { singer: { $regex: query, $options: "i" } },
      { musicDirector: { $regex: query, $options: "i" } },
      { album: { $regex: query, $options: "i" } },
    ],
  });

module.exports = { create, findAll, findById, updateById, deleteById, search };
