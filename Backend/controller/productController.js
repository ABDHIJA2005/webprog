import Product from "../model/Product.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const newProduct = new Product({ name, description, price, imageUrl });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};
