const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    singer: { type: String, required: true },
    musicDirector: { type: String, required: true },
    album: { type: String },
    releaseDate: { type: Date },
    isVisible: { type: Boolean, default: true },
    url: { type: String, required: true }, // public audio URL
    coverImage: { type: String }, // optional album art URL
  },
  { timestamps: true }
);
songSchema.index({ title: 1, singer: 1 }, { unique: true });

module.exports = mongoose.model("Song", songSchema);
