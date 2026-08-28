const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  icon: String,
  color: String,
  schoolYears: [String],
  aiTopics: [
    {
      topic: String,
      keyPoints: [String]
    }
  ],
  resources: [
    {
      title: String,
      url: String,
      type: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);