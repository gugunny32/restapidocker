const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/index')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const companysRouter = require('./routes/company')
const staffRouter = require('./routes/staffs')
const shopRouter = require('./routes/shop')
const errorHandler = require('./middleware/errorHandler')

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', companysRouter);
app.use('/staff', staffRouter);
app.use('/shop', shopRouter);

app.use(errorHandler);

module.exports = app;
