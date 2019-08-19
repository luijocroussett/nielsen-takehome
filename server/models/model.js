const { Pool } = require('pg');
const mockData = require('./mockData');
const { dbUri, isMockData, startMode } = require('../config');

// console.log(startMode, dbUri, isMockData);

const pool = new Pool({
  connectionString: dbUri,
});

/* creates tables if they do not exist, clears tables 
   and inserts mocks data based on ENV variables
*/
pool.connect((err, client, done) => {
  if (err) console.error('LOG: error connecting to db:\n', err);
  else {
    const queries = [];
    if (startMode === 'clean') {
      queries.push(
        [
          'DROP TABLE IF EXISTS appointments;',
          'appointments table deleted',
          'deleting appointments table',
        ],
        [
          'DROP TABLE IF EXISTS cars;',
          'cars table deleted',
          'deleting cars table',
        ],
        [
          'DROP TABLE IF EXISTS users;',
          'users table deleted',
          'deleting users table',
        ],
        [
          'DROP TABLE IF EXISTS drivers;',
          'drivers table deleted',
          'deleting drivers table',
        ],
      );
    }
    queries.push(
      [
        `CREATE TABLE IF NOT EXISTS users (
        user_id serial PRIMARY KEY,
        first_name varchar NOT NULL,
        last_name varchar NOT NULL,
        email varchar NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );`,
        'users table table created',
        'creating users table',
      ],
      [
        `CREATE TABLE IF NOT EXISTS drivers (
        driver_id serial PRIMARY KEY,
        first_name varchar NOT NULL,
        last_name varchar NOT NULL,
        email varchar NOT NULL,
        drivers_license varchar NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );`,
        'drivers table created',
        'creating drivers table',
      ],
      [
        `CREATE TABLE IF NOT EXISTS appointments (
        appointment_id serial,
        user_id int NOT NULL REFERENCES users(user_id),
        driver_id int NOT NULL REFERENCES drivers(driver_id),
        started_at TIMESTAMP,
        ended_at TIMESTAMP,
        price REAL,
        status VARCHAR DEFAULT 'open',
        distance REAL, 
        distance_rate REAL, 
        time_rate REAL,
        created_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (appointment_id, user_id, driver_id)
        );`,
        'appointments table created',
        'creating appointments table',
      ],
      [
        `CREATE TABLE IF NOT EXISTS cars (
        car_id serial,
        driver_id int NOT NULL REFERENCES drivers(driver_id),
        color varchar,
        license_plate varchar,
        brand varchar,
        model varchar,
        year int,
        created_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (car_id, driver_id)
      );`,
        'cars table created',
        'creating cars table',
      ],
    );
    if (isMockData === 'true') {
      for (let queryArray of mockData) {
        queries.push(queryArray);
      }
      console.log('Mock data added to query queue.');
    }
    for (let query of queries) {
      client.query(query[0], (err, result) => {
        if (err) {
          console.error('*** ERROR: ', query[2], '***\n', query, err);
          done();
          return;
        }
        console.log('*** LOG:', query[1], ' ***');
      });
    }
    done();
  }
});

module.exports = pool;
