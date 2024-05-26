const fs = require("fs");
const Album = require("../models/album");
const getCreatingDate = require("../utils/getCreatingDate");

exports.createAlbum = (req, res, next) => {
  const albumData = req.body;
  delete albumData._id; // suppression de l'id de l'article de la bdd
  delete albumData._userId; // suppression de l'id de user

  const album = new Album({
    ...albumData,
    userId: req.auth.userId,
    albumAuthor: req.auth.firstName,
    albumPicture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    albumDate: getCreatingDate(),
  });

  album.save()
    .then(() => res.status(201).json({ message: "Album créé avec succès" }))
    .catch((error) =>
      res.status(400).json({ error, message: "Erreur lors de la création de l'album !" })
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
  if (req.file) {
    updateData.albumPicture = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  Album.updateOne({ _id: req.params.id }, updateData)
    .then(() =>
      res.status(200).json({ message: "Album mis à jour avec succès !" })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ error})
    );
};

// test de la route via auth userID validé le 26/05/24
exports.deleteAlbum = (req, res, next) => {
  Album.findOne({ _id: req.params.id })
    .then((album) => {
      if (!album) {
        return res.status(404).json({ message: "Album non trouvé" });
      }
      if (album.userId !== req.auth.userId) {
        return res.status(401).json({ message: "Opération non autorisée" });
      }
      const filename = album.albumPicture.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de l'image" });
        }
        Album.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Album supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllAlbums = (req, res, next) => {
  Album.find()
    .then((albums) => {
      if (albums.length === 0) {
        return res
          .status(200)
          .json({ message: "La liste des albums est vide !" });
      } else {
        return res.status(200).json(albums);
      }
    })
    .catch((error) => res.status(400).json({ error }));
};


/* Ajouter vérification id pour put et delete */