const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  albumPicture: { type: String, required: true },
  albumName: { type: String, required: true, unique: true },
  albumDescription: { type: String, required: true },
  albumLink: { type: String, required: true },
  albumListPictures: { type: String, required: false },
  // Extras :
  albumAuthor: { type: String, required: true },
  albumDate: { type: String, required: true }, //à modifier - ajouter une fonction date getNow à la création et modification
  albumUpdate: { type: String, required: false },
  //à modifier - ajouter une fonction date getNow à la création et modification
  albumLike: { type: Number, required: false },
  //passer une route/fonction
  albumShare: { type: Number, required: false },
  //passer une route/fonction
});

module.exports = mongoose.model("Album", albumSchema);
