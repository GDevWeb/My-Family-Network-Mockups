const express = require("express");
const router = express.Router();
const Album = require("../models/album")

// Add an album:
router.post("/", (req, res, next) => {
  const album = new Album({
    ...req.body,
  });
  album
    .save()
    .then(() => res.status(201).json({ message: "Album créé avec succès !" }))
    .catch((error) => res.status(400).json({ error }));
});

// Get album by id :
router.get("/:id", (req, res, next) => {
  Album.findOne({ _id: req.params.id })
    .then((album) => res.status(200).json({ album }))
    .catch((error) => res.status(404).json({ error }));
});

// PUT - Update one album :
router.put("/:id", (req, res, next) => {
  Album.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "Album mis à jour avec succès !" })
    )
    .catch((error) =>
      res
        .status(404)
        .json({ error, message: "Erreur lors de la mise à jour de l'album ❗" })
    );
});

// Delete an album :
router.delete("/:id", (req, res, next) => {
  Album.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Album supprimé avec succès !" });
    })
    .catch((error) =>
      res
        .json(400)
        .json({ error, message: "Erreur lors de la suppression de l'album ❗" })
    );
});

// Delete one article :
router.delete("/album/:id", (req, res, next) => {
  Album.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Album supprimé avec succès !" });
    })
    .catch((error) =>
      res
        .json(400)
        .json({ error, message: "Erreur lors de la suppression de l'album ❗" })
    );
});

// Get all albums :
router.get("/", (req, res, next) => {
  Album.find()
    .then((albums) => res.status(200).json(albums))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
