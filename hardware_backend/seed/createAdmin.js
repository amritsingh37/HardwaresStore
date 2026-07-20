require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const run = async () => {
  await connectDB();

  const email = 'shuburauthan123@gmail.com';
  const password = 'Rudu4499';

  const existing = await User.findOne({ email });
  if (existing) {
    existing.password = password;
    existing.role = 'admin';
    await existing.save();
    console.log('Password updated for:', email);
  } else {
    await User.create({ name: 'Amrit Singh', email, password, role: 'admin' });
    console.log('Admin account created:', email);
  }

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });