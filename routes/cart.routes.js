const express = require('express');
const { addNewCart, getAllCarts, updateCart, deleteCart } = require('../controller/cart.controller');
const { verifyToken } = require('../middleware/verifyToken');
const cartRoutes = express.Router();

cartRoutes.post("/", verifyToken, addNewCart);
cartRoutes.get("/", verifyToken, getAllCarts);
cartRoutes.put("/", verifyToken, updateCart);
cartRoutes.delete("/", verifyToken, deleteCart);

module.exports = cartRoutes; 