const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  subject: {
    type: String,
    required: true
  },
  schoolYear: String,
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    text: String,
    images: [
      {
        url: String,
        uploadedAt: Date,
        hasTransparency: Boolean
      }
    ]
  },
  aiSuggestions: [
    {
      topic: String,
      suggestion: String,
      createdAt: Date
    }
  ],
  status: {
    type: String,
    enum: ['rascunho', 'em_progresso', 'concluido', 'entregue'],
    default: 'rascunho'
  },
  grade: Number,
  teacherFeedback: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);