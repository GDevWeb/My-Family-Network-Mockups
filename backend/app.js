const express = require("express");
const mongoose = require("mongoose");

const albumRoutes = require("./routes/album");

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

app.use("/my-family-network/api/album", albumRoutes);
module.exports = app;
