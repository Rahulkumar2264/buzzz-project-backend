const router = require('express').Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save()
    res.status(200).json(user);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(400).json("wrong password")
    }
    // generateJwt token   
    var token = jwt.sign({
      username: user.username,
      password: user.password
    },
      'secret',
      { expiresIn: "1h" }
    );

    res.status(300).json({
      message: "User Found",
      token: token,
      user_id: user._id

    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
