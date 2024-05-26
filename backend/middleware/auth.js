const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = { userId };

    // Find user to get firstName
    User.findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        req.auth.firstName = user.firstName;
        next();
      })
      .catch((error) => res.status(500).json({ error }));
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide !"),
    });
  }
};
