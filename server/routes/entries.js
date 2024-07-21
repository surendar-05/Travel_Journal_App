const express = require("express");
const Entry = require("../models/Entry");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const authToken = require("../middleware/authToken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Get Entries
router.get("/", authToken, async (req, res) => {
    const entries = await Entry.find().populate('userId', 'name profilePicture');
    res.send(entries);
});

//Create Entry

router.post("/", authToken, upload.array("photos", 10), async (req, res) => {
  console.log(req.files);
  const { title, location, travelDates, description, tags } = req.body;
  const photos = req.files.map((file) => file.path);
  const entry = new Entry({
    userId: req.userId,
    title,
    location,
    travelDates: JSON.parse(travelDates),
    description,
    photos,
    tags: JSON.parse(tags),
  });
  await entry.save();
  res.status(201).send(entry);
});

//Update Entry

router.put("/:id", authToken, async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry) {
    return res.status(404).send("Entry not found");
  }
  if (entry.userId.toString() !== req.userId)
    return res.status(403).send("Unauthorized");

  Object.assign(entry, req.body);
  await entry.save();

  res.send(entry);
});

//Delete Entry

router.delete("/:id", authToken, async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) return res.status(404).send("Entry not found");

  if (entry.userId.toString() !== req.userId)
    return res.status(403).send("Unauthorized");

  await entry.remove();

  res.send({ message: "Entry deleted" });
});

module.exports = router;
