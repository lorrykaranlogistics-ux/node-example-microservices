const express = require('express');
const { getUsers, getUser, postUser } = require('../controllers/userController');

const router = express.Router();
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', postUser);

module.exports = router;
