// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Optional: For database
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


// Optional: Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fashionStop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a schema for form submissions (optional)
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Save to database (optional)
    const newContact = new Contact({ name, email, phone, message });
    newContact.save()
        .then(() => {
            res.send('Form submitted successfully!');
        })
        .catch((err) => {
            res.status(500).send('Error saving form data.');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});