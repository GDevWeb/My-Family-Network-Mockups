const express = require("express");
const mongoose = require("mongoose");
const Album = require("./models/album");
const album = require("./models/album");

const app = express();

mongoose
  .connect(
    "mongodb+srv://gdevweb:OcEUPP3BSLtqFrbw@tuto-nodejs.m2u0gbo.mongodb.net/my-family-network?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée :", error));

app.use(express.json());

// Middleware :
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Add an album:
app.post("/my-family-network/albums", (req, res, next) => {
  const album = new Album({
    ...req.body,
  });
  album
    .save()
    .then(() => res.status(201).json({ message: "Album créé avec succès !" }))
    .catch((error) => res.status(400).json({ error }));
});

// Get album by id :
app.get("/my-family-network/albums/album/:id", (req, res, next) => {
  Album.findOne({ _id: req.params.id })
    .then((album) => res.status(200).json({ album }))
    .catch((error) => res.status(404).json({ error }));
});

// PUT - Update one album :
app.put("/my-family-network/albums/album/:id", (req, res, next) => {
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
app.delete("/my-family-network/albums/album/:id", (req, res, next) => {
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
app.get("/my-family-network/albums", (req, res, next) => {
  Album.find()
    .then((albums) => res.status(200).json(albums))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
