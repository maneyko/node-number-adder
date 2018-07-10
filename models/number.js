let mongoose = require('mongoose');

let numbersSchema = mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Numbers = module.exports = mongoose.model('Numbers', numbersSchema);
