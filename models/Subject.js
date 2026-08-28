const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  schoolYears: [{
    type: String,
    enum: ['6º', '7º', '8º', '9º', '1º EM', '2º EM', '3º EM']
  }],
  topics: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);