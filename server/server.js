const express = require('express');
const bodyParser = require('body-parser');

// loading env variavles
const { port } = require('./config');

// importing controllers
const cookieParser = require('cookie-parser');
const appointmentsRouter = require('./routes/appointments');
const carsRouter = require('./routes/cars');
const driversRouter = require('./routes/drivers');
const usersRouter = require('./routes/users');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// parse cookies from request
app.use(cookieParser());

app.use('/appointments', appointmentsRouter);
app.use('/cars', carsRouter);
app.use('/drivers', driversRouter);
app.use('/users', usersRouter);
app.use('*', (req, res) => {
  return res.status(404).json('Not found');
});

app.listen(port, () =>
  console.log(`Server running.\nListening at port ${port}.`),
);

module.exports = app;
