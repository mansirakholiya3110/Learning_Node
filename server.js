const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT;
const dbURL = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.end('Welcome to Live Server....');
});

const userRoutes = require('./routes/user.routes');
const ProductRouter=require('./routes/products.routes')

app.use("/api/user", userRoutes);
app.use("/api/product",ProductRouter)

app.listen(port, () => {
    mongoose.connect(dbURL)
        .then(() => console.log('DB is Connected!!!!'))
        .catch((err) => console.log(err));
    console.log(`Server start at http://localhost:${port}`);
})