const express = require('express');
const { getEvents, createEvent, updateEvent } = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getEvents);

// Admin-only routes
router.post('/', protect, authorize('admin'), createEvent);
router.put('/:id', protect, authorize('admin'), updateEvent);

module.exports = router;