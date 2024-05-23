const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validatorPackage = require("validator");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Veuille saisir votre prénom"],
    unique: true,
  },
  lastName: { type: String, required: [true, "Veuille saisir votre nom"] },
  age: { type: Number, required: [true, "Veuille saisir votre âge"] },
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
    default: "user",
    required: false,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
