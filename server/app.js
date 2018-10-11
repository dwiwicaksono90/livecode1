var createError = require('http-errors');
var express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/livecode1', { useNewUrlParser: true })

var eventsRouter = require('./routes/events')
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/users', usersRouter); 
app.use('/events', eventsRouter); 


module.exports = app;
