const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  userId: { type: String, required: false },
  albumPicture: { type: String, required: true },
  albumName: { type: String, required: true, unique: true },
  albumDescription: { type: String, required: true },
  albumLink: { type: String, required: true },
  albumListPictures: { type: String, required: false },
  // Extras :
  albumAuthor: { type: String, required: false},
  albumDate: { type: String, required: true }, 
  albumUpdate: { type: String, required: false },
  albumLike: { type: Number, required: false },
  //passer une route/fonction
  albumShare: { type: Number, required: false },
  //passer une route/fonction
});

module.exports = mongoose.model("Album", albumSchema);

/* Vérifier si je récupère bien l'id de l'auteur pour l'édition et suppression  */
