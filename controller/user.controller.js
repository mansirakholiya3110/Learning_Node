const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, age, gender, email, password } = req.body;
        let user = await User.findOne({ email: email });
        // console.log(user);
        if (user) {
            return res.json({ message: 'User is already registerd!!!' });
        }
        let hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            age,
            gender
        });
        res.json({ user, message: 'User register success' });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        let comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.json({ message: 'Email or Password not Matched.....!' });
        }
        let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ message: 'Login Success', token });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}