const express = require('express');
const {
  findDriver,
  createDriver,
  updateDriver,
  deleteDriver,
} = require('../controllers/driversContoller');

const driversRouter = express.Router();

driversRouter.get('/', findDriver, (req, res) => {
  return res.status(200).json(res.locals.result);
});
driversRouter.post('/', createDriver);
driversRouter.patch('/', updateDriver);
driversRouter.delete('/', deleteDriver);

module.exports = driversRouter;
