const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'IN PROGRESS', 'COMPLETED'],
    default: 'PENDING'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Add timestamps for createdAt and updatedAt
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;