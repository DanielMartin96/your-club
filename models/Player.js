const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  owner: {
    type: String,
  },
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
});

module.exports = mongoose.model('player', PlayerSchema);
