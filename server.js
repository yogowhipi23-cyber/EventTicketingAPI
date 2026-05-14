require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Root URL (Requirement #8)
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Event Ticketing API</h1>');
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// 404 Catch-All (Requirement #6)
app.use((req, res) => {
    if (req.accepts('html')) {
        res.status(404).send('<h1>404 Not Found</h1>');
    } else {
        res.status(404).json({ error: '404 Not Found' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));