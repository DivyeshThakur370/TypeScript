const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;
