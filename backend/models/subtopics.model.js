const mongoose = require('mongoose');

const subTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'SubTopic name is required'],
    trim: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: [true, 'SubTopic must belong to a topic']
  },
  level: {
    type: String,
    enum: ['EASY', 'MEDIUM', 'HARD'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Done'],
    default: 'Pending'
  },
  links: {
    leetcodeLink: {
      type: String,
      trim: true
    },
    youtubeLink: {
      type: String,
      trim: true
    },
    articleLink: {
      type: String,
      trim: true
    }
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

subTopicSchema.index({ topic: 1, order: 1 });

module.exports = mongoose.model('SubTopic', subTopicSchema);