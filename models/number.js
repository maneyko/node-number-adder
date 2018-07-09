let mongoose = require('mongoose');

// Numbers schema
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

let Numbers = module.exports = mongoose.model('Numbers', numbersSchema);
