const Album = require("../models/album");
const getCreatingDate = require("../utils/getCreatingDate");

exports.createAlbum = (req, res, next) => {
  const albumData = req.body;
  delete albumData._id;

  const album = new Album({
    ...albumData,
    albumDate: getCreatingDate(),
    albumPicture: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  album
    .save()
    .then(() => res.status(201).json({ message: "Album créé avec succès" }))
    .catch((error) =>
      res
        .status(400)
        .json({ error, message: "Erreur lors de la création de l'album !" })
    );
};

exports.getOneAlbum = (req, res, next) => {
  Album.findOne({ _id: req.params.id })
    .then((album) => res.status(200).json({ album }))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyAlbum = (req, res, next) => {
  const updateData = {
    ...req.body,
    _id: req.body.id,
    albumUpdate: getCreatingDate(),
  };
  Album.updateOne({ _id: req.params.id }, updateData)
    .then(() =>
      res.status(200).json({ message: "Album mis à jour avec succès !" })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ error, message: "Erreur lors de la mise à jour de l'album ❗" })
    );
};

exports.deleteAlbum = (req, res, next) => {
  Album.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Album supprimé avec succès !" });
    })
    .catch((error) =>
      res
        .json(400)
        .json({ error, message: "Erreur lors de la suppression de l'album ❗" })
    );
};

// Route à tester et vérifier voir créer un nouveau fichier post_routes et controllers pour les articles.
exports.deletePost = (req, res, next) => {
  Album.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Album supprimé avec succès !" });
    })
    .catch((error) =>
      res
        .json(400)
        .json({ error, message: "Erreur lors de la suppression de l'album ❗" })
    );
};

exports.getAllAlbums = (req, res, next) => {
  Album.find()
    .then((albums) => res.status(200).json(albums))
    .catch((error) => res.status(400).json({ error }));
};
