const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validatorPackage = require("validator");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    minlength: [3, "Le prénom est trop court, 3 caractères minimum"],
    maxlength: [64, "Le prénom est trop long, 64 caractères maximum"],
    required: [true, "Veuillez saisir votre prénom"],
    unique: [true, "Ce prénom est déjà utilisé"],
  },
  lastName: {
    type: String,
    minlength: [3, "Le nom est trop court, 3 caractères minimum"],
    maxlength: [64, "Le nom est trop long, 64 caractères maximum"],
    required: [true, "Veuillez saisir votre nom"],
  },
  age: {
    type: Number,
    required: [true, "Veuillez saisir votre âge"],
    min: [3, "L'âge minimum est de 3 ans"],
    max: [100, "L'âge maximum est de 100 ans"],
  },
  grade: {
    type: String,
    enum: [
      "maman",
      "papa",
      "mamy",
      "papy",
      "tata",
      "tonton",
      "parrain",
      "marraine",
      "cousin",
      "cousine",
      "membre",
    ],
    default: "membre",
    required: true,
  },
  email: {
    type: String,
    required: [true, "Une adresse mail est requise !"],
    unique: true,
    validate: {
      validator: validatorPackage.isEmail,
      message: "Veuillez saisir une adresse mail valide!",
    },
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["utilisateur", "modérateur", "administrateur"],
    default: "utilisateur",
    required: false,
  },
});

// Configuration du plugin uniqueValidator avec des messages personnalisés
userSchema.plugin(uniqueValidator, { message: "{PATH} est déjà utilisé." });

module.exports = mongoose.model("User", userSchema);
