const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async (next) => {
    const user = this;

    user.password = await bcrypt.hash(user.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;