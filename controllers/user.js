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

        res.status(200).json({
            success: true,
            message: 'The user exists.',
            user: user
        });
    } catch (err) {
        console.error(err);
    }
};

const addUser = async (req, res) => {
    const { username, userEmail, userPassword } = req.body.user;

    if (!username || !userEmail || !userPassword) {
        res.status(400).json({
            success: false,
            message: 'Ensure you have filled in all required entries.'
        });
    }

    const isUserInDB = await User.findOne({ email: userEmail });

    if (isUserInDB) {
        res.status(409).json({
            success: false,
            message: 'The user having this email already exists.'
        });
    } else {
        await User.create({
            username: username,
            email: userEmail,
            password: userPassword,
        });

        res.status(201).json({
            success: true,
            message: 'The user created.'
        });
    }

};

const updateUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.user.email });
    const updateConfig = {};

    const updatedKeys = Object.keys(user).filter((key) => {
        return user[key] !== req.body.user[key];
    });

    for (key of updatedKeys) {
        updateConfig[key] = req.body.user[key];
    }

    const updatedUser = await User.finOneAndUpdate(
        { email: req.body.user.email }, 
        updateConfig,
        { new: true });
    
    if (!updatedUser) {
        res.status(400).json({
            success: false,
            message: 'The user not updated'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'The user updated.'
        });
    }
};

const deleteUser = async (req, res) => {
    await User.findOneAndRemove({ email: req.body.user.email }, (err) => {
        res.status(400).json({
            success: false,
            message: 'The user couldn\'t be deteleted.'
        });
    });

    res.status(200).json({
        success: true,
        message: 'The user deleted'
    });
};

const deleteAllUsers = async (req, res) => {
    await User.deleteMany().catch((err) => {
        res.status(400).json({
            success: false,
            message: 'All users couldn\'t be deteleted.'
        });
    });
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers
};