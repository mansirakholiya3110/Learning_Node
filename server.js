const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT;
const dbURL = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public/images", express.static(path.join(__dirname, 'public/images')));
app.get("/", (req, res) => {
    res.end('Welcome to Live Server....');
});

const userRoutes = require('./routes/user.routes');
const ProductRouter = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

app.use("/api/user", userRoutes);
app.use("/api/product", ProductRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
    mongoose.connect(dbURL)
        .then(() => console.log('DB is Connected!!!!'))
        .catch((err) => console.log(err));
    console.log(`Server start at http://localhost:${port}`);
})