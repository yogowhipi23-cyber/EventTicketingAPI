const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Create a Booking
exports.createBooking = async (req, res) => {
    try {
        const { eventId, quantity } = req.body;

        // 1. Find the event
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        // 2. Check seat availability
        const remainingSeats = event.seatCapacity - event.bookedSeats;
        if (quantity > remainingSeats) {
            return res.status(400).json({ error: `Not enough seats. Only ${remainingSeats} left.` });
        }

        // 3. Create the booking
        const booking = await Booking.create({
            user: req.user.id, // From protect middleware
            event: eventId,
            quantity
        });

        // 4. Update the Event's bookedSeats count
        event.bookedSeats += quantity;
        await event.save();

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get current user's bookings (Requirement #9)
exports.getMyBookings = async (req, res) => {
    try {
        // Users can only see their own records
        const bookings = await Booking.find({ user: req.user.id }).populate('event', 'title date venue');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};