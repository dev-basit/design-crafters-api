const express = require("express");
const router = express.Router();
const _ = require("lodash");

const auth = require("../middleware/auth");
const { Gig, validate } = require("../models/gig");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const gig = new Gig(req.body);
    const savedGig = await gig.save();
    return res.json(savedGig);
  } catch (error) {
    return res.status(400).json({ errorMessage: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.find().populate("user", "-_id name profilePicture").select("-_v ");
    return res.json(gigs);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const gig = await Gig.find({ _id: req.params.id }).populate("user", "-_id name profilePicture");
    return res.json(gig);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
});

router.get("/myGigs/:id", async (req, res) => {
  try {
    const gigs = await Gig.find({ user: req.params.id }).select("-_v -_id");
    return res.json(gigs);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching gigs" });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const gig = await Gig.findByIdAndRemove(req.params.id);
//     if (!gig) return res.status(404).json({ errorMessage: "Gig not found" });

//     return res.json({ message: "Gig deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ errorMessage: error.message });
//   }
// });

module.exports = router;
