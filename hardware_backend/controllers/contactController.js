const ContactMessage = require('../models/ContactMessage');
const sendEmail = require('../utils/sendEmail');

const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Name, email and message are required');
    }
    const saved = await ContactMessage.create({ name, email, phone, message });
    await sendEmail({
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`
    });
    res.status(201).json({ message: 'Thanks — we will get back to you shortly.', id: saved._id });
  } catch (err) { next(err); }
};

const getContactMessages = async (req, res, next) => {
  try {
    res.json(await ContactMessage.find().sort('-createdAt'));
  } catch (err) { next(err); }
};

const deleteContactMessage = async (req, res, next) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Message not found');
    }
    res.json({ message: 'Message deleted' });
  } catch (err) { next(err); }
};

module.exports = { submitContactMessage, getContactMessages, deleteContactMessage };