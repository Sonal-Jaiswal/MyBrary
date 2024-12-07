// Load environment variables
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    console.error('Failed to load .env file:', result.error);
} else {
    console.log('Loaded environment variables:', result.parsed);
}

// Import required modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Express App Setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// Database Connection
const dbUrl = process.env.DATABASE_URL 
// || 'mongodb://localhost:27017/mydb'; // Default for testing
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongoose'))
    .catch(err => console.error('Could not connect to Mongoose:', err));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Start the Server
const PORT = process.env.PORT 
// || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
