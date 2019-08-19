const pool = require('../models/model');
const {
  buildInsertQuery,
  buildUpdateQuery,
  buildSelectQuery,
} = require('../utilities/queryBuilder');

module.exports = {
  // find custom appointments
  findAppointments: (req, res, next) => {
    const {
      from,
      to,
      sortBy,
      type,
      filter_value,
      filter_column,
      id,
      operations,
      order,
    } = res.locals;
    console.log('filter value', filter_value);
    const query = buildSelectQuery(
      'appointments',
      filter_column,
      filter_value,
      type,
      // { from, to, sortBy, operations, order },
    );
    console.log(query);
    if (query instanceof Error) return res.status(500).json(query);
    console.log(query);
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error: #findAppointments.\n', error);
        return res.status(500).send(error);
      }
      res.locals.result = results.rows.length ? results.rows[0] : [];
      next();
    });
  },
  // create an appointment
  createAppointment: (req, res, next) => {
    console.log('*** LOG: creating appointment ***');
    // sanitizing data
    const { user_id, driver_id } = res.locals;
    // validating body
    if (!user_id || !driver_id)
      return res.status(400).json('no user id or driver id');
    // building parametized query
    const result = buildInsertQuery({ user_id, driver_id }, 'appointments');

    // error validation
    if (query instanceof Error) return res.status(500).json(query);
    const { query, values } = result;
    console.log(query, values);

    // postgres query
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('*** Error: #createAppointments. ***\n', error);
        return res.status(500).send(error);
      }
      return res.status(201).json(result.rows);
    });
  },

  updateAppointment: (req, res) => {
    console.log('*** LOG: updating appointment ***');
    const {
      distance_rate,
      time_rate,
      ended_at,
      price,
      status,
      user_id,
      car_id,
      started_at,
      distance,
      id,
    } = res.locals;
    // building parametized query
    const result = buildUpdateQuery(
      {
        user_id,
        car_id,
        started_at,
        distance,
        price,
        status,
        distance_rate,
        time_rate,
        ended_at,
      },
      'appointments',
      'appointment_id',
      id,
    );

    //error validation
    if (query instanceof Error) return res.status(500).json(query);
    const { query, values } = result;
    console.log(query);

    // postgres query
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('*** Error: #updateAppointments. ***\n', error);
        return res.status(500).send(error);
      }
      return res.status(200).json('updated successfully');
    });
  },

  deleteAppointment: (req, res) => {
    console.log('*** LOG: deleting appointment ***');
    // sanitizing data
    const { id } = req.params;
    const query = `DELETE FROM appointments WHERE appointment_id = ${id};`;
    pool.query(query, (error, result) => {
      if (error) {
        console.error('*** Error: #deleteAppointments. ***\n', error);
        return res.status(500).send(error);
      }
      console.log('*** LOG: Successful deletion ***');
      return res.status(200).send('success');
    });
  },
};
