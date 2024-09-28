const Order = require('../model/order.model');
const Cart = require('../model/cart.model');

exports.addNewOrder = async (req, res) => {
    try {
        let carts = await Cart.find({ user: req.user._id, isDelete: false }).populate('user').populate('product');
        if (carts.length === 0) {
            return res.json({ message: 'Cart is empty' });
        }
        let orderItems = carts.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.Price,
            totalPrice: item.quantity * item.product.Price
        }));
    
        let totalAmount = orderItems.reduce((total, item) => total += (item.quantity * item.price), 0);

        let order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount
        });
        await Cart.updateMany({ user: req.user._id, isDelete: false }, { isDelete: true });
        res.json({ order, message: 'Order placed Success' });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server Error' });
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        let orders = await Order.find({ user: req.user._id, isDelete: false });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server Error' });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        let order = await Order.findOne({ _id: req.query.orderId, isDelete: false });
        if (!order)
            return res.json({ message: 'Order is not found' });
        order = await Order.findByIdAndUpdate(order._id, { isDelete: true }, { new: true });
        res.json({ order, message: 'Order is delete' })
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server Error' })
    }
}

