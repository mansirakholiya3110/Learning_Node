const express = require('express');
const { registerUser, loginUser, showProfile } = require('../controller/user.controller');
const userRoutes = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const { upload } = require('../middleware/imageUpload');

userRoutes.post("/register", upload.single('profileImage'), registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/", verifyToken, showProfile);

module.exports = userRoutes;