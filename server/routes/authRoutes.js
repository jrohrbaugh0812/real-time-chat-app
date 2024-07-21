const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/api/authentication', authController.authenticate);
router.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;