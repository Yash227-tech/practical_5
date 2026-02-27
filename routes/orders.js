const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validate');



router.post('/', validateOrder, orderController.placeOrder);
router.get('/:userId', orderController.getUserOrders);
router.get('/detail/:orderId', orderController.getOrderById);

module.exports = router;
