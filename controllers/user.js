const User = require('../model/user');

const getAllUsers = async (req, res) => {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            throw Error('Such a user does not exist...');
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
    }
};

const addUser = (req, res) => {
    

};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

const deleteAllUsers = (req, res) => {

};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers
};