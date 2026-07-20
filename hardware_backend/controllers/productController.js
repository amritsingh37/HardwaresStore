const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const products = await Product.find(filter).populate('category', 'name slug')
      .sort('-createdAt').skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) { res.status(404); throw new Error('Product not found'); }
    res.json(product);
  } catch (err) { next(err); }
};

const createProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

const updateProduct = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!product) { res.status(404); throw new Error('Product not found'); }
    res.json(product);
  } catch (err) { next(err); }
}; 

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }
    res.json({ message: 'Product removed' });
  } catch (err) { next(err); }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };