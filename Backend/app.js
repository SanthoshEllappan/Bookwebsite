const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const bookRoutes = require('./routes/bookroutes');
const errorHandler = require('./utils/errorhandler');
const app = express();
const cors= require('cors')

require('dotenv').config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(cors())
app.options('*',cors())
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

module.exports = app;
