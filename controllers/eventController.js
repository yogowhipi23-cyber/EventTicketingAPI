const Event = require('../models/Event');

// GET all events (with filtering for Category and Date)
exports.getEvents = async (req, res) => {
    try {
        let query = {};
        if (req.query.category) query.category = req.query.category;
        if (req.query.date) query.date = req.query.date;

        const events = await Event.find(query);
        res.status(200).json({ count: events.length, data: events });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST Create Event (Admin Only)
exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT Update Event (Admin Only)
exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        // Logic check: seatCapacity cannot be lower than bookedSeats
        if (req.body.seatCapacity && req.body.seatCapacity < event.bookedSeats) {
            return res.status(400).json({ error: 'Capacity cannot be less than current bookings' });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};