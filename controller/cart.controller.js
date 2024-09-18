const Cart = require('../model/cart.model');

exports.addNewCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id, product: req.body.product, isDelete: false });
        if (cart) {
            return res.json({ message: 'Cart already exist' });
        }
        cart = await Cart.create({
            user: req.user._id,
            ...req.body
        });
        res.json({ cart, message: 'Cart Added' });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server Error' });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        let carts = await Cart.find({ user: req.user._id, isDelete: false }).populate('user').populate('product');
        let orderItems = carts.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.Price,
            totalPrice: item.quantity * item.product.Price
        }));

        let totalAmount = orderItems.reduce((total, item) => total += (item.quantity * item.price), 0);

        res.json({ orderItems, totalAmount });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server Error' });
    }
}

exports.updateCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ _id: req.query.cartId, isDelete: false });
        if (!cart)
            return res.json({ message: 'Cart is not found' });
        cart = await Cart.findByIdAndUpdate(cart._id, { ...req.body }, { new: true });
        res.json({ cart, message: 'Cart Updated....' });
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.deleteCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ _id: req.query.cartId, isDelete: false });
        if (!cart)
            return res.json({ message: 'cart is not found' });
        cart = await Cart.findByIdAndUpdate(cart._id, { isDelete: true }, { new: true });
        res.json({ cart, message: 'Cart is delete' })
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}