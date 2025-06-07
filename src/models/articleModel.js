const mongoose = require("mongoose");
const { paginate } = require("./plugins");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    name: { type: String, required: true },
    catId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    en: [{ type: String }],
    vn: [{ type: String }],
    vocabulary: { type: String },
  },
  { timestamps: true }
);

articleSchema.plugin(paginate);

module.exports = mongoose.model("Article", articleSchema);
