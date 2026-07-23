require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');

connectDB();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/seed-admin-temp-xyz123', async (req, res) => {
  try {
    const User = require('./models/User');
    const email = 'shuburauthan123@gmail.com';
    const password = 'Rudu4499';

    const existing = await User.findOne({ email });
    if (existing) {
      existing.password = password;
      existing.role = 'admin';
      await existing.save();
      return res.json({ message: 'Password updated for ' + email });
    } else {
      await User.create({ name: 'Amrit Singh', email, password, role: 'admin' });
      return res.json({ message: 'Admin account created: ' + email });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);

// ---- Serve React build (Vite dist) ----
app.use(express.static(path.join(__dirname, '../hardware_frontend/dist')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../hardware_frontend/dist', 'index.html'));
});
// ---- End of static/catch-all block ----

// notFound and errorHandler should now only catch stray /api/* routes,
// since everything else is handled by the catch-all above
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Shiva Hardware API running on port ${PORT}`));