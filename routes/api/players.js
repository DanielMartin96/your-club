const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Player = require('../../models/Player');
const User = require('../../models/User');

// @route    POST api/players
// @desc     Register player
// @access   Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('position', 'Position is required').notEmpty(),
  check('age', 'Age is required').notEmpty(),
  check('gender', 'Gender is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, position, age, gender } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      const { email } = user;

      let player = new Player({
        name,
        position,
        age,
        gender,
        owner: email,
      });

      player = await player.save();

      res.json(player);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/players
// @desc     Get all of users players
// @access   Public
router.get('/email/:email', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const { email } = user;

    const players = await Player.find({ owner: email });

    res.json(players);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/players/edit/:id
// @desc     Get player
// @access   Public
router.get('/edit/:id', auth, async (req, res) => {
  try {
    const player = await Player.findOne({ _id: req.params.id });

    res.json(player);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/players/:id
// @desc     Edit player
// @access   Private
router.put('/:id', auth, async (req, res) => {
  try {
    const player = await Player.findOne({ _id: req.params.id });

    const { name, position, age, gender } = req.body;

    player.name = name;
    player.position = position;
    player.age = age;
    player.gender = gender;

    await player.save();

    res.json(player);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/players/:id
// @desc     Delete a player
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ msg: 'Player not found' });
    }

    await player.remove();

    res.json({ msg: 'Player removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
