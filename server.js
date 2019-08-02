const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const userRoutes = require('./components/users/usersRoutes');

const app = express();

// Connect to database
connectDB();

app.use(cors());

/*
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));*/

app.use(express.json());

app.get('/', (req, res) => res.json({ msg: 'Welcome to the eventbritemaps app' }));

app.use('/users', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});