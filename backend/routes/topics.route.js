const express = require('express');
const router = express.Router();
const {
  getAllTopics,
  getTopic,
  completeSubTopic,
  getUserProgress
} = require('../controller/topics.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getAllTopics);
router.get('/progress', protect, getUserProgress);
router.get('/:id', protect, getTopic);
router.post('/subtopics/:id/complete', protect, completeSubTopic);

module.exports = router;