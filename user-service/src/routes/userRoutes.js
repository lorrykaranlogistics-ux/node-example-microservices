const express = require('express');
const { getUsers, getUsersByTier, getUser, postUser, putUser, removeUser } = require('../controllers/userController');

const router = express.Router();
router.get('/users', getUsers);
router.get('/users/tier/:tier', getUsersByTier);
router.get('/users/:id', getUser);
router.post('/users', postUser);
router.put('/users/:id', putUser);
router.delete('/users/:id', removeUser);

module.exports = router;
