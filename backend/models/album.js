const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  albumPicture: { type: String, required: true },
  albumName: { type: String, required: true },
  albumLink: { type: String, required: true },
  albumListPictures: { type: String, required: true },
});

module.exports = mongoose.model("Album", albumSchema);
