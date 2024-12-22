import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email and select password explicitly
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create and return the token
    const token = createToken(user._id);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      return res.status(400).json({ success: false, message: "Please enter a stronger password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Create and return the token
    const token = createToken(user._id);
    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });  // Expiration time added
};

export { loginUser, registerUser };
