const mongoose = require('mongoose');

const planetschema = mongoose.Schema({
  kepler_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Planet', planetschema);