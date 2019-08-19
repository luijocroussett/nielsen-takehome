module.exports = [
  [
    "INSERT INTO users (first_name, last_name, email) VALUES ('John','Smith','john@email.com') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO users(first_name, last_name, email) VALUES('Mike','Smith','mike@email.com') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO users(first_name, last_name, email) VALUES('Jess','Smith','jess@email.com') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO users(first_name, last_name, email) VALUES('Kate','Smith','kate@email.com') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO users(first_name, last_name, email) VALUES('Rose','Smith','rose@email.com') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO users(first_name, last_name, email) VALUES('Gilbert','Smith','gilbert@email.com') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('John','Smith','john@email.com', 'A10001') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Mike','Rodriguez','mike@email.com', 'A10002') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Jess','White','jess@email.com', 'A10003') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Kate','Davis','kate@email.com', 'A10004') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Rose','Doe','rose@email.com', 'A10005') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Gilbert','Peterson','gilbert@email.com', 'A10006') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Maria','Black','maria@email.com', 'A10007') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Peter','White','peter@email.com', 'A10008') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Joshua','McNeal','joshua@email.com', 'A10009') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Karen','Roberts','karen@email.com', 'A10010') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO drivers(first_name, last_name, email, drivers_license) VALUES('Mlissa','McDaniel','melissa@email.com', 'A10011') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(1, 'black','10001','honda', 'civic', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(2, 'white','10002','ford', 'explorer' , '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(3, 'yellow','10003','bmw', 'Series 5', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(4, 'red','10004','toyota', 'corolla', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(5, 'black','10005','acura', 'mdx', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(6, 'blue','10006','lexus', 'IS350', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(7, 'green','10007','honda','pilot' , '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(8, 'black','10008','ford', 'fusion', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(9, 'white','10009','ford', 'edge', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(10, 'white','10010','jeep', 'grand cherokee', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
  [
    "INSERT INTO cars(driver_id, color, license_plate, brand, model, year) VALUES(11, 'black','10010','jeep', 'compass', '2019') RETURNING *",
    'data inserted',
    'error inserting data',
  ],
];
