import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/ 
  },
  regNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[0-9]{2}[A-Z]{3}[0-9]{4}$/ 
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[0-9]{10}$/ 
  },
  gender: { 
    type: String, 
    enum: ["Male", "Female", "Other"], 
    required: true 
  },
  hostelBlock: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

export default User;
