const pool = require('../models/model');
const {
  buildInsertQuery,
  buildUpdateQuery,
} = require('../utilities/queryBuilder');

module.exports = {
  findCar: (req, res) => {
    console.log('*** LOG: finding car ***');
    const { id } = req.params;
    const query = `SELECT * FROM cars WHERE car_id=${id};`;
    pool.query(query, (error, { rows }) => {
      if (error) {
        console.error('Error: #findCar.\n', error);
        return res.status(501).send(error);
      }
      if (rows.length) {
        console.log(rows);
        return res.status(200).json(rows);
      } else {
        console.log('*** LOG: nothing found ***');
        return res.status(200).send('nothing found');
      }
    });
  },

  createCar: (req, res) => {
    console.log('*** LOG: creating car ***');
    // sanitizing data
    const { user_id, car_id, scheduled_for } = req.body;
    // building parametized query
    const { query, values } = buildInsertQuery(
      { user_id, car_id, scheduled_for },
      'cars',
    );
    console.log(query, values);
    pool.query(query, values, (error, { rows }) => {
      if (error) {
        console.error('*** Error: #createCar. ***\n', error);
        return res.status(501).send(error);
      }
      console.log(rows);
      return res.status(200).json(rows);
    });
  },

  updateCar: (req, res) => {
    console.log('*** LOG: updating car ***');
    const { id } = req.params;
    // sanitizing data
    const { user_id, car_id, scheduled_for } = req.body;
    // building parametized query
    const { query, values } = buildUpdateQuery(
      {
        user_id,
        car_id,
        scheduled_for,
      },
      'cars',
      'car_id',
      id,
    );
    console.log(query);
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('*** Error: #updateCar. ***\n', error);
        return res.status(501).send(error);
      }
      return res.status(200).json(result.rows);
    });
  },

  deleteCar: (req, res) => {
    console.log('*** LOG: deleting car ***');
    // sanitizing data
    const { id } = req.params;
    const query = `DELETE FROM cars WHERE car_id = ${id};`;
    pool.query(query, (error, { rows }) => {
      if (error) {
        console.error('*** Error: #deleteCar. ***\n', error);
        return res.status(501).send(error);
      }
      console.log('*** LOG: Successful deletion ***');
      return res.status(200).send('success');
    });
  },
};
