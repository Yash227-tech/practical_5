const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateLogin } = require('../middleware/validate');



router.post('/signup', validateUser, userController.signup);
router.post('/login', validateLogin, userController.login);
router.get('/:id', userController.getUserById);

module.exports = router;
