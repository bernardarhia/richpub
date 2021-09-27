const express = require("express");
const router = express.Router();
const Product = require("../models/Books");
const Cart = require("../models/Cart");
const verifyToken = require("../middlewares/verifyToken");

router.post("/add-to-cart", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!quantity || quantity < 1) return res.status(400).send("CHoose at least one quantity");
  // check if product exists
  const productExists = await Product.findById({ _id: productId });
  if (!productExists) return res.status(404).send("Product not found");

  // get product details needed
  const { _id, price } = productExists;
  try {
    const itemExists = await Cart.findOne({clientId: req.user._id});

    if (!itemExists || itemExists.length < 1) {
      // Add a new Item to the cart
      const newCartItem = new Cart({
        clientId: req.user._id,
        cart: [{ product: _id, quantity, price }],
      });
      await newCartItem.save()
      return res.send(newCartItem);
    }


    // check if product is in user's cart
  
    // const savedCart = await Cart.updateOne({_id: itemExists._id},{cart.quantity});
    // res.status(200).send(savedCart)
  } catch (error) {
    res.status(400).send({error});
  }
});

router.get("/cart", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ clientId: req.user._id });
    if (!cart)
      return res.status(400).json({ message: "No item found in cart" });

    return res.status(200).send(cart);
  } catch (error) {
    return res.status(400).send("Cart not found");
  }
});

// clear cart
router.delete("/clear-cart", verifyToken, async (req, res) => {
  try {
    const clearedCart = await Cart.findByIdAndDelete({
      clientId: req.user._id,
    });
    if (!clearedCart)
      return res.status(404).send({ message: "Unable to clear cart" });

    return res.status(200).send({ message: "cart cleared" });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
