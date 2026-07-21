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
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);

// ---- Serve React build (Vite dist) ----
app.use(express.static(path.join(__dirname, '../hardware_frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../hardware_frontend/dist', 'index.html'));
});
// ---- End of static/catch-all block ----

// notFound and errorHandler should now only catch stray /api/* routes,
// since everything else is handled by the catch-all above
app.use(notFound);
app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Shiva Hardware API running on port ${PORT}`));
