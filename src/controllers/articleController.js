const Article = require("../models/articleModel");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const getArticles = catchAsync(async (req, res) => {
  const option = pick(req.query, ["limit", "page"]);
  console.log(option);
  const articles = await Article.paginate({}, option);
  // .find()
  //     .populate("catId", "title")
  //     .sort({ createdAt: -1 })

  res.send({ status: httpStatus.OK, data: { results: articles } });
});

const getArticle = catchAsync(async (req, res) => {
  const { catId } = req.params;

  const articles = await Article.find({ catId })
    .populate("catId", "title")
    .sort({ createdAt: -1 });

  res.send({
    status: httpStatus.OK,
    data: { results: articles },
  });
});
const createArticle = catchAsync(async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json({ message: "Article created successfully", article });
});
const updateArticle = catchAsync(async (req, res) => {
  const { articleId } = req.params;
  console.log("articleId", articleId);
  const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body, {
    new: true,
  });

  if (!updatedArticle) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.json({
    message: "Article updated successfully",
    article: updatedArticle,
  });
});

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
};
