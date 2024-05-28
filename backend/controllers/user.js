const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// Signup Controller
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        grade: req.body.grade,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Compte créé avec succès" });
        })
        .catch((error) => {
          if (error.code === 11000 && error.keyPattern.email) {
            res.status(400).json({ message: "Adresse mail déjà utilisée" });
          } else if (error.errors) {
            const errorMessages = Object.values(error.errors).map(
              (err) => err.message
            );
            res.status(400).json({ message: errorMessages.join(", ") });
          } else {
            res.status(500).json({ message: "Erreur serveur" });
          }
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Login Controller
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Paire identifiant / mot de passe incorrect !" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res
        .status(401)
        .json({ message: "Paire identifiant / mot de passe incorrect !" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ userId: user._id, token: token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
