const express = require('express');
const {createPayment,getPayments}= require('../controller/payment.controller');
const { verifyToken } = require('../middleware/verifyToken');
const paymentRoutes = express.Router();


paymentRoutes.post('/payments',verifyToken,createPayment);
paymentRoutes.get('/payments', verifyToken,getPayments);

module.exports = paymentRoutes;
 