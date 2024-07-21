const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });


//Register

router.post('/register', upload.single('profilePicture'), async (req, res) => {
  const { name, email, password, bio } = req.body;
  try {
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      bio,
      profilePicture: req.file ? req.file.path : ''
    });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).send('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id }, '', { expiresIn: '1h' });
      res.send({ token });
    } catch (err) {
      res.status(400).send(err);
    }
  });



  
  module.exports = router;