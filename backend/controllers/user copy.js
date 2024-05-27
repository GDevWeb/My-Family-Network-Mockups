const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// Signup Controller
// Signup Controller
// Signup Controller
exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      grade: req.body.grade,
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.status(201).json({ message: "Compte créé avec succès" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Duplicate email error
      res.status(400).json({ message: "L'adresse email est déjà utilisée." });
    } else if (error.errors && error.errors.email) {
      // Validation error for email
      res.status(400).json({ message: error.errors.email.message });
    } else if (error.errors && error.errors.firstName) {
      // Validation error for firstName
      res.status(400).json({ message: error.errors.firstName.message });
    } else {
      // Other errors
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
};

// Login Controller
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Paire identifiant / mot de passe incorrect !" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Paire identifiant / mot de passe incorrect !" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(200).json({ userId: user._id, token: token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
