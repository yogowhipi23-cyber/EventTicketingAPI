const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    venue: { type: String },
    date: { type: Date, required: true },
    time: { type: String },
    seatCapacity: { 
        type: Number, 
        required: true,
        min: [1, 'Capacity must be at least 1'] 
    },
    bookedSeats: { type: Number, default: 0, min: 0 },
    price: { 
        type: Number, 
        required: true,
        min: [0, 'Price cannot be negative'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);