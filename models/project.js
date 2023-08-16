const mongoose = require("mongoose");
const Joi = require("joi");

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  imageUrl: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 99999999,
  },
});

const Project = mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = {
    userId: Joi.objectId().required(),
    title: Joi.string().min(4).max(255).required(),
    imageUrl: Joi.string().min(4).max(1024).required(),
    price: Joi.number().min(1).max(99999999).required(),
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
