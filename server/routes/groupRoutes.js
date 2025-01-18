const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Create new group
router.post('/api/group', groupController.createGroup);

// Get group data
router.get('/api/group/:id', groupController.getUserGroups);

module.exports = router;