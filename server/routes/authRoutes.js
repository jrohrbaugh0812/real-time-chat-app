const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/api/authentication', authController.authenticate);

module.exports = router;