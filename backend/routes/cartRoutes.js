const express = require("express");
const Cart = require("../models/cart");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET USER CART
router.get("/", authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.json({ items: [] });
  }

  res.json({ items: cart.items });
});

// ADD TO CART
router.post("/add", authMiddleware, async (req, res) => {
  const { product } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) =>
      String(item.productId) === String(product.productId)
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      productId: product.productId,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  await cart.save();

  res.json(cart);
});
router.post("/update", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (item) => String(item.productId) === String(productId)
  );

  if (!item) return res.status(404).json({ message: "Item not found" });

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => String(item.productId) !== String(productId)
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save();

  res.json(cart);
});


// REMOVE FROM CART
// REMOVE FROM CART
router.post("/remove", authMiddleware, async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => String(item.productId) !== String(productId)
  );

  await cart.save();

  res.json(cart);
});

module.exports = router;
