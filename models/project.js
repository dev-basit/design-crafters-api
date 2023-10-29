const mongoose = require("mongoose");
const Joi = require("joi");

const projectSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gig",
    required: true,
  },
  // seller: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  //   min: 1,
  //   max: 99999999,
  // },
});

const Project = mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = {
    buyer: Joi.objectId().required(),
    seller: Joi.objectId().required(),
    gig: Joi.objectId().required(),
    // price: Joi.number().min(1).max(99999999).required(),
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
