
// const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
// const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin:'http://localhost:5173/',
    Credentials:true
}));
// app.use(bodyParser.json());


// Routes
app.post('/api/register', (req, res) => {
    // Handle registration logic here
    // ...existing code...
    res.json({ message: 'Registration successful' });
});

// Start the server
app.listen(5173, () => {
    console.log(`Server is running on port 5173`);
});
