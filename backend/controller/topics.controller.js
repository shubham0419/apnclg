const Topic = require("../models/topics.model");
const SubTopic = require("../models/subtopics.model");
const User = require("../models/user.model");

// @desc    Get all topics with subtopics
// @route   GET /api/topics
// @access  Private
exports.getAllTopics = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const topics = await Topic.find().populate("subTopics").sort({ order: 1 });

    const enrichedTopics = topics.map((topic) => {
      const topicObj = topic.toObject();

      topicObj.subTopics = topicObj.subTopics.map((st) => ({
        ...st,
        isCompleted: user.completedSubTopics.some(
          (completedId) => completedId.toString() === st._id.toString()
        ),
      }));

      const totalSubTopics = topicObj.subTopics.length;
      const completedCount = topicObj.subTopics.filter(
        (st) => st.isCompleted
      ).length;
      topicObj.isCompleted =
        totalSubTopics > 0 && completedCount === totalSubTopics;
      topicObj.completedCount = completedCount;
      topicObj.totalCount = totalSubTopics;

      return topicObj;
    });

    res.status(200).json({
      success: true,
      count: enrichedTopics.length,
      topics: enrichedTopics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single topic with subtopics
// @route   GET /api/topics/:id
// @access  Private
exports.getTopic = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const topic = await Topic.findById(req.params.id).populate("subTopics");

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    const topicObj = topic.toObject();
    topicObj.subTopics = topicObj.subTopics.map((st) => ({
      ...st,
      isCompleted: user.completedSubTopics.some(
        (completedId) => completedId.toString() === st._id.toString()
      ),
    }));

    res.status(200).json({
      success: true,
      topic: topicObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Mark subtopic as complete
// @route   POST /api/topics/subtopics/:id/complete
// @access  Private
exports.completeSubTopic = async (req, res) => {
  try {
    const userId = req.user.id;
    const subTopicId = req.params.id;

    const subTopic = await SubTopic.findById(subTopicId);
    if (!subTopic) {
      return res.status(404).json({
        success: false,
        message: "SubTopic not found",
      });
    }

    const user = await User.findById(userId);

    const alreadyCompleted = user.completedSubTopics.some(
      (id) => id.toString() === subTopicId
    );

    if (alreadyCompleted) {
      user.completedSubTopics = user.completedSubTopics.filter(
        (id) => id.toString() !== subTopicId
      );

      const level = subTopic.level.toLowerCase();
      user.progress[level].completed = Math.max(0, user.progress[level].completed - 1);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "SubTopic marked as incomplete",
        progress: user.getProgressPercentages(),
      });
    }

    user.completedSubTopics.push(subTopicId);

    const level = subTopic.level.toLowerCase();
    user.progress[level].completed += 1;

    await user.save();

    const allSubTopics = await SubTopic.find({ topic: subTopic.topic });
    const allCompleted = allSubTopics.every((st) =>
      user.completedSubTopics.some((id) => id.toString() === st._id.toString())
    );

    if (allCompleted) {
      await Topic.findByIdAndUpdate(subTopic.topic, { isPending: false });
    }

    res.status(200).json({
      success: true,
      message: "SubTopic marked as complete",
      progress: user.getProgressPercentages(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user progress
// @route   GET /api/topics/progress
// @access  Private
exports.getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const progressPercentages = user.getProgressPercentages();

    res.status(200).json({
      success: true,
      progress: {
        counts: user.progress,
        percentages: progressPercentages,
        totalCompleted: user.completedSubTopics.length,
        totalSubTopics:
          user.progress.easy.total +
          user.progress.medium.total +
          user.progress.hard.total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
