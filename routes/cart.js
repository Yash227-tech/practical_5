const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { validateCartItem } = require('../middleware/validate');



router.get('/:userId', cartController.getCart);
router.post('/:userId', validateCartItem, cartController.addToCart);
router.put('/:userId/:productId', cartController.updateCartItem);
router.delete('/:userId/:productId', cartController.removeFromCart);

module.exports = router;
