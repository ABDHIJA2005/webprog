import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ Add an item to the cart
router.post("/add", async (req, res) => {
    const { userId, product } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if product already exists, update quantity
        const existingItem = cart.items.find(item => item.productId === product.productId);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.items.push(product);
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Get user's cart
router.get("/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart || { userId: req.params.userId, items: [] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Remove an item from cart
router.post("/remove", async (req, res) => {
    const { userId, productId } = req.body;

    try {
        await Cart.updateOne(
            { userId },
            { $pull: { items: { productId } } }
        );

        res.status(200).json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Clear the entire cart
router.post("/clear", async (req, res) => {
    const { userId } = req.body;

    try {
        await Cart.updateOne({ userId }, { $set: { items: [] } });

        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
