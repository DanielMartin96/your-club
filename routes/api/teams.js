const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Team = require('../../models/Team');
const User = require('../../models/User');

// @route    POST api/players
// @desc     Register player
// @access   Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('ageGroup', 'Age group is required').notEmpty(),
  check('gender', 'Gender is required').notEmpty(),
  check('formation', 'Formation is required').notEmpty(),
  check('players', 'Players are required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, ageGroup, gender, formation, players } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      const { email } = user;

      let team = await Team.findOne({ name });

      if (team) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Team already exists' }] });
      }

      team = new Team({
        name,
        ageGroup,
        gender,
        formation,
        players,
        owner: email,
      });

      await team.save();

      res.json(team);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/teams
// @desc     Get all teams
// @access   Public
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();

    res.json(teams);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/teams
// @desc     Get all of users teams
// @access   Public
router.get('/:email', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const { email } = user;

    const teams = await Team.find({ owner: email });

    res.json(teams);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/teams/edit/:id
// @desc     Get team
// @access   Public
router.get('/edit/:id', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.id });

    res.json(team);
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
    const team = await Team.findOne({ _id: req.params.id });

    const { name, ageGroup, gender, formation, players } = req.body;

    team.name = name;
    team.ageGroup = ageGroup;
    team.gender = gender;
    team.formation = formation;
    team.players = players;

    await team.save();

    res.json(team);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/teams/:id
// @desc     Delete a team
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const { email } = user;

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    if (team.owner !== email) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await team.remove();

    res.json({ msg: 'Team removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
