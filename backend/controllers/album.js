const fs = require("fs");
const Album = require("../models/album");
const getCreatingDate = require("../utils/getCreatingDate");
const errorMessages = require("../utils/errorMessages");
const { error } = require("console");

const {
  creatingSuccess,
  creatingError,
  albumNotFound,
  notAuthorized,
  updatingAlbumSuccess,
  updatingAlbumError,
  emptyList,
} = errorMessages;

exports.createAlbum = (req, res, next) => {
  const albumData = req.body;
  delete albumData._id;
  delete albumData._userId;

  const album = new Album({
    ...albumData,
    userId: req.auth.userId,
    albumAuthor: req.auth.firstName,
    albumPicture: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    albumDate: getCreatingDate(),
  });

  album
    .save()
    .then(() => res.status(201).json({ message: creatingSuccess }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error, message: creatingError });
    });
};

exports.getOneAlbum = (req, res, next) => {
  Album.findOne({ _id: req.params.id })
    .then((album) => res.status(200).json({ album }))
    .catch((error) => res.status(404).json({ error, message: albumNotFound }));
};

exports.modifyAlbum = (req, res, next) => {
  Album.findOne({ _id: req.params.id })
    .then((album) => {
      if (!album) {
        return res.status(404).json({ message: albumNotFound });
      }
      if (album.userId !== req.auth.userId) {
        return res.status(401).json({ message: notAuthorized });
      }

      const updateData = {
        ...req.body,
        albumUpdate: getCreatingDate(),
      };

      if (req.file) {
        const oldFileName = album.albumPicture.split("/images/")[1];
        fs.unlink(`images/${oldFileName}`, (error) => {
          if (error) {
            console.log(
              "Erreur lors de la suppression de l'image précédente",
              error
            );
          }
        });
        updateData.albumPicture = `${req.protocol}://${req.get(
          "host"
        )}/images/${req.file.filename}`;
      }

      Album.updateOne({ _id: req.params.id }, updateData)
        .then(() => res.status(200).json({ message: updatingAlbumSuccess }))
        .catch((error) =>
          res.status(400).json({ message: updatingAlbumError })
        );
      console.log(error);
    })
    .catch((error) => res.status(500).json({ error }));
  console.log(error);
};

exports.deleteAlbum = (req, res, next) => {
  Album.findOne({ _id: req.params.id })
    .then((album) => {
      if (!album) {
        return res.status(404).json({ message: albumNotFound });
      }
      if (album.userId !== req.auth.userId) {
        return res.status(401).json({ message: notAuthorized });
      }
      const filename = album.albumPicture.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de l'image", err);
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de l'image" });
        }
        Album.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Album supprimé !" }))
          .catch((error) => {
            console.error(error);
            res.status(400).json({ error });
          });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};

exports.getAllAlbums = (req, res, next) => {
  Album.find()
    .then((albums) => {
      if (albums.length === 0) {
        return res.status(200).json({ message: emptyList });
      } else {
        return res.status(200).json(albums);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
