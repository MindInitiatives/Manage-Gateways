const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config')


// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
 }) //Adding new mongo url parser
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();

//Port Number
const port = process.env.PORT || 8080;

// Handling cors
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//vBodyParser Middleware
app.use(express.json());

//Use Routes
app.use('/api/gateways', require('./routes/api/gateways'));

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => console.log(`Server started on port ${port}`));