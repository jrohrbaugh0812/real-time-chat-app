const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Create new group
router.post('/api/group', groupController.createGroup);

module.exports = router;