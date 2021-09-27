const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/fileUpload");
const { productsValidator } = require("../validation/validations");

// Add product to the products table
// NB: We are using upload().any() because we want to send both json and file together
router.post(
  "/add-product",
  verifyToken,
  isAdmin,
  upload().any(),
  async (req, res) => {
    const { title, description, quantity, price } = req.body;

    // check if file exists
    const file = req.files;
    if (!file || file == null)
      return res.status(400).send("Add a product image");

    // check file extension
    const extension =
      file[0].originalname.split(".")[
        file[0].originalname.split(".").length - 1
      ];
    if (!["jpg", "png", "jpeg"].includes(extension)) {
      return res.status(400).send("product image should be jpg, jpeg, png");
    }

    // validate the user data coming in
    const { error } = productsValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product({
      author: req.user._id,
      title,
      description,
      image: file,
      quantity,
      price,
    });

    try {
      await product.save();
      res.status(200).send("Product recorded");
    } catch (error) {
      res.status(400).send("Unable to record product");
    }
  }
);

// View product
router.get("/product/:product_id", verifyToken, async (req, res) => {
  // get product id from request url
  const { product_id } = req.params;

  try {
    const product = await Product.findOne({ _id: product_id})
     if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send("Can't view product");
  }
});

// Edit product
router.put(
  "/edit-product/:product_id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { title, description, quantity, price } = req.body;

    // validate the user data coming in
    const { error } = productsValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // get product id from request url
    const { product_id } = req.params;

    try {
      // check if product exists
      const productExists = await Product.findById({ _id: product_id });
      if (!productExists) return res.status(404).send("Product not found");

      // Check if product
      if (productExists.author != req.user._id)
        return res
          .status(400)
          .send("You can't delete a product you didn't record");

      // update product
      const updated = await Product.findByIdAndUpdate(
        product_id,
        { title, description, quantity, price },
        { new: true }
      );
      res.send(updated);
    } catch (error) {
      res.status(400).send("Unable to update product");
    }
  }
);
// Remove product form the products table
router.delete(
  "/remove-product/:product_id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { product_id } = req.params;

    try {
      // check if product exists
      const productExists = await Product.findById({ _id: product_id });
      if (!productExists) return res.status(404).send("Product not found");

      // Check if product
      if (productExists.author != req.user._id)
        return res
          .status(400)
          .send("You can't delete a product you didn't record");

      // Remove product
      const removedProduct = await Product.findByIdAndDelete({
        _id: product_id,
      });
      res.status(200).send("Product deleted");
    } catch (error) {
      res.status(400).send("Unable to delete product");
    }
  }
);
module.exports = router;
