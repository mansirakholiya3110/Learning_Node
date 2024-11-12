const jwt = require('jsonwebtoken');
const User = require('../model/user.model');


exports.verifyToken = async (req, res, next) => {
    let authorization = req.headers['authorization'];
    console.log(authorization);
    // let token = authorization.split("")[0];
    // console.log(token);
    let { userId } = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(userId)
    let user = await User.findOne({ _id: userId });
    // console.log(user);
    if (!user)
        return res.json({ message: 'User not found' });

    req.user = user;
    next();

}