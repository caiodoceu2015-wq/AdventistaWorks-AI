const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  schoolYear: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    url: String,
    hasTransparency: Boolean,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  content: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['rascunho', 'finalizado'],
    default: 'rascunho'
  },
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