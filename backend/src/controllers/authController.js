import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

const totalUsers = await User.countDocuments();
const role =
  totalUsers === 0
    ? "admin"
    : "employee";

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
});

   
    const token =
      generateToken(
        user._id,
        user.role
      );

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Invalid Password",
      });
    }

    const token =
      generateToken(
        user._id,
        user.role
      );

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const forgotPassword =
async (req, res) => {
  try {
    const user =
      await User.findOne({
        email: req.body.email,
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const resetToken =
      crypto
        .randomBytes(20)
        .toString("hex");

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpire =
      Date.now() +
      15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `Reset your password using this link: ${resetUrl}`
    );

    res.status(200).json({
      success: true,
      message:
        "Reset link sent",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const resetPassword =
async (req, res) => {
  try {
    const user =
      await User.findOne({
        resetPasswordToken:
          req.params.token,

        resetPasswordExpire: {
          $gt: Date.now(),
        },
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid or expired token",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        req.body.password,
        10
      );

    user.password =
      hashedPassword;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};