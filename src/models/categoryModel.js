const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
