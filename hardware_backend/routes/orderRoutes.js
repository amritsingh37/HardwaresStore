const express = require('express');
const { createOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', createOrder);
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

module.exports = router;