const express = require('express');
const {
  findCar,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carsController');

const carsRouter = express.Router();

carsRouter.get('/', findCar);
carsRouter.post('/', createCar);
carsRouter.patch('/', updateCar);
carsRouter.delete('/', deleteCar);

module.exports = carsRouter;
