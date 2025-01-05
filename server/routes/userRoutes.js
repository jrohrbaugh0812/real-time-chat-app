const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user info
router.get('/api/user/:id', userController.getUserInfo);

// Update user profile
router.put('/api/user/:id', userController.updateUserInfo);

module.exports = router;