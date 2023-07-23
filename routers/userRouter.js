const express = require('express');
const userRouter = express.Router();
const { 
        getAllUsers,
        getUser,
        addUser,
        updateUser,
        deleteUser,
        deleteAllUsers
    } = require('../controllers/user');

userRouter.route('/users')
    .get(getAllUsers)
    .delete(deleteAllUsers);

userRouter.route('/user')
    .get(getUser)
    .post(addUser);

userRouter.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = userRouter;