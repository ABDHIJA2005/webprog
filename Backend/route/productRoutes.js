import express from "express";
import { createProduct, getProducts, getProductById } from "../controller/productController.js";

const router = express.Router();

// Route to create a product
router.post("/products", createProduct);

// Route to get all products
router.get("/products", getProducts);

// Route to get a single product by ID
router.get("/products/:id", getProductById);

export default router;
