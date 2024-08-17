import { User, UserSchemaZod } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "../controller/.env",
});

export const Register = async (req, res) => {
  try {
    const validatedData = UserSchemaZod.parse(req.body); // here we are validating the data according to the zod schema
    const { name, email, password, phone } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    //Here we are hashing the password and phone number before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedphone = await bcrypt.hash(phone, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone: hashedphone,
    });
    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: error.errors[0].message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const validatedData = UserSchemaZod.pick({
      email: true,
      password: true,
    }).parse(req.body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).jsom({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: error.errors[0].message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const Logout = (req, res) => {
  return res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "strict",
    })
    .status(200)
    .json({
      message: "Logout successful",
      success: true,
    });
};