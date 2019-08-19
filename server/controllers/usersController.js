const pool = require('../models/model');
const {
  buildUpdateQuery,
  buildInsertQuery,
} = require('../utilities/queryBuilder');

module.exports = {
  findUser: (req, res) => {
    console.log('*** LOG: finding user ***');
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE user_id = ${id};`;
    pool.query(query, (error, { rows }) => {
      if (error) {
        console.error('Error: #findUsers.\n', error);
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

  createUser: (req, res) => {
    console.log('*** LOG: creating user ***');
    // sanitizing data
    const { first_name, last_name, email } = req.body;
    const { query, values } = buildInsertQuery(
      { first_name, last_name, email },
      'users',
    );
    console.log(query, values);
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('*** Error: #createUser. ***\n', error);
        return res.status(501).send(error);
      }
      console.log(result.rows);
      return res.status(200).json(result.rows);
    });
  },

  updateUser: (req, res) => {
    console.log('*** LOG: updating user ***');
    // sanitizing data
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const { query, values } = buildUpdateQuery(
      {
        first_name,
        last_name,
        email,
      },
      'users',
      'user_id',
      id,
    );
    pool.query(query, values, (error, { rows }) => {
      if (error) {
        console.error('*** Error: #updateUser. ***\n', error);
        return res.status(501).send(error);
      }
      return res.status(200).json(rows);
    });
  },

  deleteUser: (req, res) => {
    console.log('*** LOG: deleting user ***');
    // sanitizing data
    const { id } = req.params;
    const query = `DELETE FROM users WHERE user_id = ${id};`;
    pool.query(query, (error, { rows }) => {
      if (error) {
        console.error('*** Error: #deleteUser. ***\n', error);
        return res.status(501).send(error);
      }
      console.log('*** LOG: Successful deletion ***');
      return res.status(200).send('success');
    });
  },
};
