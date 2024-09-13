const Product = require('../model/products.model');

exports.addProduct = async (req, res) => {
    try {
    const { Title, Description, Price, ProductImage, Category } = req.body;
    let product = await Product.findOne({ Title: Title });
    // console.log(product);
        if (product) {
            return res.json({ product, message: "all ready add" });
        }
        product = await Product.create({
            Title,
            Description,
            Price,
            ProductImage,
            Category
        })
        res.json({product, message: 'Product Added.....'})

    } catch (error) {
        console.log(error)
        res.json(err);
    }
}


exports.getAllProduct=async(req,res)=>{
    try {
        let product=await Product.find({})
        return res.json(product)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.getProduct=async(req,res)=>{
    try {
        let product=await Product.findOne({_id:req.query.productId});
        if(!product)
            return res.json({message: 'Product is not found'});
        res.json(product)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};


exports.updateProduct=async(req,res)=>{
    try {
        let product=await Product.findOne({_id:req.query.productId,});
        if(!product)
            return res.json({message: 'Product is not found'});
        product = await Product.findByIdAndUpdate(product._id, {...req.body}, {new: true});
        res.json({product, message: 'Product Updated....'});
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};


exports.deleteProduct=async(req,res)=>{
    try {
        let product=await Product.findOne({_id:req.query.productId});
        if(!product)
            return res.json({message: 'Product is not found'});
        product = await Product.findByIdAndDelete(product._id);
        res.json({product, message: 'Product Deleted....'});
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};



