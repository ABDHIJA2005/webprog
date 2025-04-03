import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./route/authRoutes.js";
import cartRoutes from "./route/cartRoutes.js"; // Import cart routes

const app = express();

dotenv.config()
const PORT = process.env.PORT||4000;
const URI=process.env.MongoDBURI;

// Middleware to parse JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// ✅ Allow frontend requests (Adjust if needed)
app.use(cors({
    origin: "http://127.0.0.1:5501", // Allow frontend to access backend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);  // Add cart routes

try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("MongoDB Connected");
    
} catch (error) {
    console.error("error failed to connect");
}




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
