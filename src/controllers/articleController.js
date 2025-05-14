const Article = require("../models/articleModel");
const catchAsync = require("../utils/catchAsync");

const getArticles = catchAsync(async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

const createArticle = catchAsync(async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json({ message: "Article created successfully", article });
});
const updateArticle = catchAsync(async (req, res) => {
  const { articleId } = req.params;
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
  createArticle,updateArticle
};
