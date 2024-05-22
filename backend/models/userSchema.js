const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const emailRegex = require("../utils/regexMail");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return emailRegex.test(email);
      },
      message: (props) =>
        `${props.value} ce n'est pas une adresse mail valide!`,
    },
  },
  password: { type: String, required: true },
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
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
