const express = require('express');
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes here require login
router.use(protect);

router.post('/', createBooking);
router.get('/', getMyBookings);

module.exports = router;