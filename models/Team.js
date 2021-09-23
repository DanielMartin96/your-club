const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  owner: {
    type: String,
  },
  name: {
    type: String,
  },
  ageGroup: {
    type: String,
  },
  gender: {
    type: String,
  },
  formation: {
    type: Number,
  },
  players: [
    {
      name: {
        type: String,
      },
      position: {
        type: String,
      },
      age: {
        type: Number,
      },
      gender: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('team', TeamSchema);
