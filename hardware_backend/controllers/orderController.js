const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

const createOrder = async (req, res, next) => {
  try {
    const { customerName, customerPhone, items, totalAmount, shippingAddress } = req.body;
    if (!customerName || !customerPhone) {
      res.status(400);
      throw new Error('Name and phone are required');
    }
    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No order items provided');
    }
    const order = await Order.create({ customerName, customerPhone, items, totalAmount, shippingAddress });

    const itemLines = items.map((i) => `- ${i.name} x${i.quantity} @ ₹${i.price}`).join('\n');
    await sendEmail({
      subject: `New order from ${customerName} — ₹${totalAmount}`,
      text: `Customer: ${customerName}\nPhone: ${customerPhone}\nAddress: ${shippingAddress?.line1}, ${shippingAddress?.city}, ${shippingAddress?.state} - ${shippingAddress?.pincode}\n\nItems:\n${itemLines}\n\nTotal: ₹${totalAmount}`
    });

    res.status(201).json(order);
  } catch (err) { next(err); }
};

const getAllOrders = async (req, res, next) => {
  try {
    res.json(await Order.find().sort('-createdAt'));
  } catch (err) { next(err); }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json(order);
  } catch (err) { next(err); }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json({ message: 'Order deleted' });
  } catch (err) { next(err); }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus, deleteOrder };