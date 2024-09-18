const express = require('express');
const { addNewOrder, getAllOrder, deleteOrder } = require('../controller/order.controller');
const { verifyToken } = require('../middleware/verifyToken');
const orderRoutes = express.Router();

orderRoutes.post("/", verifyToken, addNewOrder);
orderRoutes.get("/", verifyToken, getAllOrder);
orderRoutes.delete("/", verifyToken, deleteOrder)


module.exports = orderRoutes;