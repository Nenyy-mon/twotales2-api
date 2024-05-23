const { Product } = require('../models/product')

const handleErrors = (err) => {
    console.log(err.message, err.code)
}
module.exports.product_get = (req, res) => {
    const productList = Product.find()
        .then((products) => {
            res.send(products)
        })
        .catch((err) => {
            handleErrors(err)
        })
    return productList

}

module.exports.product_post = async (req, res) => {
    try {
        const { id, name, img, price, count } = req.body;

        let product = await Product.findOne({ id });

        if (product) {
            product.count += count;

        } else {
            product = new Product({
                id,
                name,
                img,
                price,
                count
            });
        }

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        handleErrors(err)
        res.status(500).json({
            error: err.message,
            success: false
        });
    }
}




module.exports.produgtSingle_post = async (req, res) => {
    try {
        const data = req.body;
        res.status(201).json({ data })
    } catch (err) {
        console.log(err)
    }
}
