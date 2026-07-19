const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'reservations.json');

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Route to serve the main HTML page at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Modern_Restaurant_Webpage.html'));
});

// Helper function to read reservations from file
const readReservations = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error('Error reading reservations file:', error);
        return [];
    }
};

// Helper function to write reservations to file
const writeReservations = (reservations) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing to reservations file:', error);
        return false;
    }
};

// GET: Fetch all reservations
app.get('/api/reservations', (req, res) => {
    const reservations = readReservations();
    res.json(reservations);
});

// POST: Add a new reservation
app.post('/api/reservations', (req, res) => {
    const { name, date, guests } = req.body;

    if (!name || !date || !guests) {
        return res.status(400).json({ error: 'All fields (name, date, guests) are required.' });
    }

    const newReservation = {
        id: Date.now().toString(),
        name,
        date,
        guests,
        createdAt: new Date().toISOString()
    };

    const reservations = readReservations();
    reservations.push(newReservation);

    if (writeReservations(reservations)) {
        res.status(201).json({ message: 'Reservation successfully created!', reservation: newReservation });
    } else {
        res.status(500).json({ error: 'Failed to save reservation.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
