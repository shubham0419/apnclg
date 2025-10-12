// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  completedSubTopics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTopic'
  }],
  progress: {
    easy: {
      completed: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    medium: {
      completed: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    hard: {
      completed: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    }
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getProgressPercentages = function() {
  const calculatePercentage = (completed, total) => {
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return {
    easy: calculatePercentage(this.progress.easy.completed, this.progress.easy.total),
    medium: calculatePercentage(this.progress.medium.completed, this.progress.medium.total),
    hard: calculatePercentage(this.progress.hard.completed, this.progress.hard.total),
    overall: calculatePercentage(
      this.progress.easy.completed + this.progress.medium.completed + this.progress.hard.completed,
      this.progress.easy.total + this.progress.medium.total + this.progress.hard.total
    )
  };
};

module.exports = mongoose.model('User', userSchema);