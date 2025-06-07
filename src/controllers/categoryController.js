const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const getCategories = catchAsync(async (req, res) => {
  const categories = await Category.find()
    .populate("topicId", "title")
    .sort({ createdAt: -1 });

  res.send({ status: httpStatus.OK, data: { results: categories } });
});

const createCategory = catchAsync(async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json({ message: "Category created successfully", category });
});
const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    req.body,
    { new: true }
  );

  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({
    message: "Category updated successfully",
    category: updatedCategory,
  });
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
};
