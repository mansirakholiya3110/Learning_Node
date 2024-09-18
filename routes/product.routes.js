const express = require("express")
const { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const { upload } = require("../middleware/imageUpload");

const ProductRouter = express.Router();


ProductRouter.post("/", upload.single('ProductImage'), addProduct);
ProductRouter.get("/",getAllProduct)
ProductRouter.get("/single",getProduct)
ProductRouter.put("/",upload.single('ProductImage'), updateProduct)
ProductRouter.delete("/", deleteProduct)

module.exports = ProductRouter;