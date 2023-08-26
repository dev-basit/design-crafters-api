const mongoose = require("mongoose");
const Joi = require("joi");

const gigSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
  },
  category: {
    type: String,
    enum: [
      "digitalArtists",
      "craftArtists",
      "painters",
      "photographers",
      "sculptors",
      "illustrators",
      "aiArtists",
    ],
    required: true,
  },
  deliveredIn: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  NoOfRevisions: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 99999999,
  },
});

const Gig = mongoose.model("Gig", gigSchema);

function validateGig(gig) {
  const schema = {
    userId: Joi.objectId().required(),
    title: Joi.string().min(4).max(200).required(),
    image: Joi.string().required(),
    description: Joi.string().min(10).max(2000).required(),
    category: Joi.string()
      .valid(
        "digitalArtists",
        "craftArtists",
        "painters",
        "photographers",
        "sculptors",
        "illustrators",
        "aiArtists"
      )
      .required(),
    deliveredIn: Joi.number().integer().min(1).max(30).required(),
    NoOfRevisions: Joi.number().integer().min(0).max(10).required(),
    price: Joi.number().min(1).max(99999999).required(),
  };

  return Joi.validate(gig, schema);
}

exports.Gig = Gig;
exports.validate = validateGig;
