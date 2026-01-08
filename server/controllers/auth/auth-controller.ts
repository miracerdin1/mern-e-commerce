import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";

// Register User
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.json({ success: false, message: "User already exists" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
};

// Login User
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      "CLIENT_SECRET_KEY"
    ) as import("../../types/express").AuthJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Export controllers
module.exports = {
  registerUser,
  login,
  logoutUser,
  authMiddleware,
};
