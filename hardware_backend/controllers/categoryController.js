const Category = require('../models/Category');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, slug, icon } = req.body;
    const category = await Category.create({ name, slug, icon });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, createCategory };