const Payment = require('../model/payment.model');
const Order = require('../model/order.model');

exports.createPayment = async (req, res) => {
    try {
        const { orderId, method } = req.body;
        const order = await Order.findById(orderId);

        if (!order || order.isDelete) {
            return res.json({ message: 'Order not found or deleted' });
        }

        const payment = new Payment({
            amount: order.totalAmount,
            method,
            status: 'pending',
        });

        await payment.save();
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error processing payment', error });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const { orderId } = req.query;

        let payments;
        if (orderId) {
            payments = await Payment.find({ orderId }).populate('orderId');
        } else {
            payments = await Payment.find().populate('orderId');
        }
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error retrieving payments', error });
    }
}; 
