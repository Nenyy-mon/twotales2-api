const { CartSchema } = require('../models/cart.js');
const privateUser = require('../models/privateUser.js');

module.exports.cart_get_redirect = (req, res) => {
    try {

        res.status(200).redirect('/privateUser/loginMain')
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
}






module.exports.cart_patch = async (req, res) => {
    try {
        let userId = req.params.id;
        const idCheck = () => {
            if (userId.includes(':')) {
                return userId.slice(1)
            } else {
                return userId
            }
        }
        let { id } = req.body
        const updatedUser = await privateUser.findOneAndUpdate({ _id: idCheck(), "cart.id": id },
            { $inc: { "cart.$.count": 1 } },
            { new: true })

        res.json({ msg: 'Cart item updated', updatedUser });
        return updatedUser

    }
    catch (err) {
        res.json({ error: err.message })
    }

}

module.exports.cart_patchDeleteOne = async (req, res) => {
    try {
        let userId = req.params.id;
        const idCheck = () => {
            if (userId.includes(':')) {
                return userId.slice(1)
            } else {
                return userId
            }
        }
        let { id } = req.body
        const updatedUser = await privateUser.findOneAndUpdate({ _id: idCheck(), "cart.id": id },
            { $inc: { "cart.$.count": -1 } },
            { new: true })
        res.json({ msg: 'Cart item updated', updatedUser });
        return updatedUser

    }
    catch (err) {
        res.json({ error: err.message })
    }

}




module.exports.cart_post = async (req, res) => {
    try {
        const userId = req.params.id;
        const idManag = userId.slice(1)
        const { id, name, price, img, count } = req.body
        const foundUser = await privateUser.findById(idManag)
        let usersCart = foundUser.cart;
        const newCartItem = new CartSchema({
            id: id,
            name: name,
            img: img,
            price: price,
            count: count + 1
        })
        usersCart = [...usersCart, newCartItem]
        const updatedUser = await privateUser.findByIdAndUpdate(idManag, { $push: { cart: newCartItem } }, { new: true });
        await res.status(200).json({ msg: 'Users cart populated', user: updatedUser })
        return updatedUser
    } catch (error) {
        await res.status(400).json({ error: error, msg: "Pogresismo" })
    }

}
