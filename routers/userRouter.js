const express = require('express');
const userRouter = express.Router();
const { getUser,
        addUser,
        updateUser,
        deleteUser
    } = require('../controllers/user');

userRouter.route('/user')
    .get(getUser)
    .post(addUser);

userRouter.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = userRouter;