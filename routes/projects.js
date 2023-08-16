const { Project, validate } = require("../models/project");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    return res.json(savedProject);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.id });
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!project) return res.status(404).json({ error: "Project not found" });
//     return res.json(project);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndRemove(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
