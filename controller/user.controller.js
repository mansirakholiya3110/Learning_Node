const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User

exports.registerUser = async (req, res) => {
    try {
        let { firstName, lastName, age, gender, email, password, profileImage } = req.body;
        let user = await User.findOne({ email: email });
        // console.log(user);
        if (user) {
            return res.json({ message: 'User is already registerd!!!' });
        }
        if (req.file) {
            profileImage = req.file.path.replace(/\\/g, '/');
        }
        let hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            age,
            gender,
            profileImage
        })
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
        // console.log(user);
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
};

exports.showProfile = async (req, res) => {
    res.json(req.user)
}
exports.updateProfile = async (req, res) => {
    try {
        let user = req.user;
        if (!user)
            return res.json({ message: 'User is not found' });
        user = await User.findByIdAndUpdate(user._id, { ...req.body }, { new: true })
        res.json({ user, message: 'Profile Updated...' })
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        let user = req.user;
        if (!user)
            return res.json({ message: 'User is not found..!' })
        user = await User.findByIdAndUpdate(user._id, { isDelete: true }, { new: true })
        res.json({ user, message: 'User is Deleted....!!!!' })
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        let user = req.user;
        // console.log(user);
        if (user) {
            return res.json({ message: 'password is already change!!!' });
        }
        let hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        user = await User.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true })
        res.json({ user, message: 'Password Updated...' })
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}
