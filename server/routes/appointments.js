const appointmentsRouter = require('express').Router();
const {
  getCurrentDriverAppointments,
  getTimeParams,
  getAppointmentParams,
  getEndParams,
  getStartParams,
  getUpdateParams,
  isDriverFree,
} = require('../controllers/dataValidationControllers');
const {
  findAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentsController');
const { findDriver } = require('../controllers/driversContoller');

const { getRate } = require('../services/rateService');

appointmentsRouter.get(
  '/byTime',
  getTimeParams,
  findAppointments,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  },
);
appointmentsRouter.get(
  '/:id',
  getAppointmentParams,
  findAppointments,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  },
);
appointmentsRouter.post(
  '/',
  getCurrentDriverAppointments,
  findAppointments,
  isDriverFree,
  createAppointment,
);
appointmentsRouter.patch(
  '/end',
  getAppointmentParams,
  findAppointments,
  getEndParams,
  getRate,
  updateAppointment,
);
appointmentsRouter.patch(
  '/start',
  getAppointmentParams,
  findAppointments,
  getStartParams,
  updateAppointment,
);
appointmentsRouter.patch('/', getUpdateParams, updateAppointment);
appointmentsRouter.delete('/', deleteAppointment);

module.exports = appointmentsRouter;
