const Topic = require("../models/topicModel");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const getTopics = catchAsync(async (req, res) => {
 const topics = await Topic.find().sort({ createdAt: -1 });
  res.send({ status: httpStatus.OK, data: { results: topics } });
});

const createTopic = catchAsync(async (req, res) => {
  const topic = new Topic(req.body);
  await topic.save();
  res.json({ message: "Topic created successfully", topic });
});
const updateTopic = catchAsync(async (req, res) => {
  try {
    const { topicId } = req.params;
    const updatedTopic = await Topic.findByIdAndUpdate(topicId, req.body, {
      new: true,
    });

    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic updated successfully", topic: updatedTopic });
  } catch (error) {
    res.status(500).json({ message: "Error updating topic" });
  }
});

module.exports = {
  getTopics,
  createTopic,
  updateTopic,
};
