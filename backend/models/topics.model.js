const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Topic name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Algorithms',
      'Data Structures',
      'Databases',
      'Machine Learning',
      'Operating Systems',
      'Networks',
      'Object Oriented Programming',
      'System Design',
      'Computer Architecture',
      'Compilers',
      'Security',
      'Theory of Computation',
      'Software Engineering',
      'Artificial Intelligence'],
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isPending: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

topicSchema.virtual('subTopics', {
  ref: 'SubTopic',
  localField: '_id',
  foreignField: 'topic'
});

module.exports = mongoose.model('Topic', topicSchema);


