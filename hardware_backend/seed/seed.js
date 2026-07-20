require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

const run = async () => {
  await connectDB();
  await Category.deleteMany();
  await Product.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Building materials', slug: 'building-materials' },
    { name: 'Power tools', slug: 'power-tools' },
    { name: 'Hand tools', slug: 'hand-tools' },
    { name: 'Plumbing & fittings', slug: 'plumbing' },
    { name: 'Electrical', slug: 'electrical' },
    { name: 'Paints & finishes', slug: 'paints' },
    { name: 'Safety gear', slug: 'safety' }
  ]);
  const bySlug = (slug) => categories.find((c) => c.slug === slug)._id;

  await Product.insertMany([
    { name: 'Crushed stone (Gitti) 20mm', brand: 'Local quarry', price: 45, stock: 500, category: bySlug('building-materials'), image: '/images/gitti.jpg' },
    { name: 'River sand (Balu), fine', brand: 'Local supplier', price: 38, stock: 500, category: bySlug('building-materials'), image: '/images/balu.jpg' },
    { name: 'Water storage tank, 1000L', brand: 'Generic', price: 5499, stock: 15, category: bySlug('building-materials'), image: '/images/tanki.jpg' },
    { name: 'OPC 53 grade cement, 50kg', brand: 'Generic', price: 380, stock: 200, category: bySlug('building-materials'), image: '/images/cement.jpg' },
    { name: 'TMT steel bars, 12mm (Fe500)', brand: 'Generic', price: 620, stock: 100, category: bySlug('building-materials'), image: '/images/tmt.jpg' },
    { name: 'Impact drill GSB 500', brand: 'Bosch', price: 3499, stock: 24, category: bySlug('power-tools') },
    { name: 'Claw hammer 450g', brand: 'Stanley', price: 399, stock: 60, category: bySlug('hand-tools') },
    { name: 'Safety goggles, clear', brand: '3M', price: 199, stock: 80, category: bySlug('safety') }
  ]);
  console.log('Seed complete');
  await mongoose.connection.close();
  process.exit(0);
};
run().catch((err) => { console.error(err); process.exit(1); });