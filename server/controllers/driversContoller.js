const pool = require('../models/model');
const {
  buildUpdateQuery,
  buildInsertQuery,
  buildSelectQuery,
} = require('../utilities/queryBuilder');

module.exports = {
  findDriver: (req, res) => {
    console.log('*** LOG: finding driver ***');
    const { id } = req.params;
    const query = `SELECT * FROM drivers WHERE driver_id = ${id};`;
    pool.query(query, (error, result) => {
      if (error) {
        console.error('Error: #findDriver.\n', error);
        return res.status(501).send(error);
      }
      if (result.rows.length) {
        console.log(rows);
        res.locals.result = result.rows[0];
        next();
      } else {
        console.log('*** LOG: nothing found ***');
        return res.status(200).send('nothing found');
      }
    });
  },

  createDriver: (req, res) => {
    console.log('*** LOG: creating driver ***');
    // sanitizing data
    const { first_name, last_name, email, driver_license } = req.body;
    const { query, values } = buildInsertQuery(
      { first_name, last_name, email, driver_license },
      'drivers',
    );
    console.log(query, values);
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('*** Error: #createDriver. ***\n', error);
        return res.status(501).send(error);
      }
      console.log(result.rows);
      return res.status(200).json(result.rows);
    });
  },

  updateDriver: (req, res) => {
    console.log('*** LOG: updating driver ***');
    // sanitizing data
    const { id } = req.params;
    const { first_name, last_name, email, driver_license } = req.body;
    const { query, values } = buildUpdateQuery(
      {
        first_name,
        last_name,
        email,
        driver_license,
      },
      'drivers',
      'driver_id',
      id,
    );
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('*** Error: #updateDriver. ***\n', error);
        return res.status(501).send(error);
      }
      return res.status(200).send('success');
    });
  },

  deleteDriver: (req, res) => {
    console.log('*** LOG: deleting driver ***');
    // sanitizing data
    const { id } = req.params;
    const query = `DELETE FROM drivers WHERE driver_id = ${id};`;
    pool.query(query, (error, { rows }) => {
      if (error) {
        console.error('*** Error: #deleteDriver. ***\n', error);
        return res.status(501).send(error);
      }
      console.log('*** LOG: Successful deletion ***');
      return res.status(200).send('success');
    });
  },
};
