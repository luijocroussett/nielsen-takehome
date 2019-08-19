const express = require('express');
const {
  findUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', findUser);
usersRouter.post('/', createUser);
usersRouter.patch('/', updateUser);
usersRouter.delete('/', deleteUser);

module.exports = usersRouter;
