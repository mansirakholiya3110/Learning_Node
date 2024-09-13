const express=require("express")
const { addProduct,getAllProduct,getProduct, updateProduct, deleteProduct} = require('../controller/product.controller');

const ProductRouter = express.Router();


ProductRouter.post("/", addProduct);
ProductRouter.get("/",getAllProduct)
ProductRouter.get("/single",getProduct)
ProductRouter.put("/",updateProduct)
ProductRouter.delete("/",deleteProduct)

module.exports = ProductRouter;