const express = require("express");
const router = express.Router();
const Book = require("../models/Books");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/fileUpload");
const { productsValidator } = require("../validation/validations");
const User = require("../models/User");

// Add product to the products table
// NB: We are using upload().any() because we want to send both json and file together
router.post(
  "/add-book",
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
// get author's name
const _author = await User.findById(req.user._id);

    const book = new Book({
      author: req.user._id,
      authorName: _author.username,
      title,
      description,
      image: file[0].buffer,
      quantity,
      price,
    });

    try {
      await book.save();
      res.status(200).send("Book recorded");
    } catch (error) {
      res.status(400).send("Unable to record book");
    }
  }
);

// View product
router.get("/book/:book_id", verifyToken, async (req, res) => {
  // get product id from request url
  const { book_id } = req.params;

  try {
    const book = await Book.findOne({ _id: book_id });
    if (!book) return res.status(404).send("Product not found");
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send("Can't view book");
  }
});

// Edit product
router.put("/edit-book/:book_id", verifyToken, isAdmin, async (req, res) => {
  const { title, description, quantity, price } = req.body;

  // validate the user data coming in
  const { error } = productsValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // get book id from request url
  const { book_id } = req.params;

  try {
    // check if book exists
    const bookExists = await Book.findById({ _id: book_id });
    if (!bookExists) return res.status(404).send("Book not found");

    // validate book's existence
    if (bookExists.author != req.user._id)
      return res.status(400).send("You can't delete a book you didn't record");

    // update book
    const updated = await Book.findByIdAndUpdate(
      book_id,
      { title, description, quantity, price, updatedAt: Date.now() },
      { new: true }
    );
    res.send(updated);
  } catch (error) {
    res.status(400).send("Unable to update book");
  }
});
// Remove book form the books table
router.delete(
  "/remove-book/:book_id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    const { book_id } = req.params;

    try {
      // check if product exists
      const bookExists = await Product.findById({ _id: book_id });
      if (!bookExists) return res.status(404).send("Book not found");

      // Check if product
      if (bookExists.author != req.user._id)
        return res
          .status(400)
          .send("You can't delete a book you didn't record");

      // Remove product
      const removedBook = await Book.findByIdAndDelete({
        _id: book_id,
      });
      res.status(200).send("Book deleted");
    } catch (error) {
      res.status(400).send("Unable to delete book");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send({ books });
  } catch (error) {
    res.status(500).send({ error: "Unable to fetch books" });
  }
});

// Get book image
router.get("/:id/image", async (req, res) => {
  const book = await Book.findById(req.params.id );
  res.set("Content-Type", "image/jpg");
   res.send(book.image);
});
module.exports = router;
