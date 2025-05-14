const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    name: { type: String, required: true },
    catId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    en: [{ type: String }],
    vn: [{ type: String }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Article", articleSchema);
