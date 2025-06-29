import { PrismaClient } from "../generated/prisma/index.js";
import generatePin from "../utils/pin/generatePin.js";
import generateRegNumber from "../utils/regNumber/generate.js";
import { saveImage } from "../utils/upload/save.js";
import jsonwebtoken from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET, SALT } from "../config/env.js";
import { NODE_ENV } from "../config/env.js";
import bcrypt from "bcrypt";
import { json } from "express";

const createToken = (input) => {
  return jsonwebtoken.sign(input, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const prisma = new PrismaClient();

// get all staff details
export const getAllStaff = async (req, res, next) => {
  try {
    const staff = await prisma.staffs.findMany();
    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    next(error);
  }
};

// get this staff for staff login
export const getThisStaff = async (req, res, next) => {
  try {
    const { email, password } = req.body; // 🔥 Get from body, not URL

    const staff = await prisma.staffs.findUnique({ where: { email } }); // 🔥 Use findUnique

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    const isMatch = await bcrypt.compare(password, staff.password_hash); // 🔥 staff is now an object

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const tokenInput = {
      fullname: staff.fullname,
      class: staff.class,
      role: staff.status === "admin" ? "admin" : "staff",
      status: staff.status,
      email: staff.email,
      reg_number: staff.reg_number || "staff",
      parent_phone: staff.parent_phone || "N/A",
    };

    const token = createToken(tokenInput);

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "none", // 🔥 key for cross-origin
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    return res.status(200).json({
      success: true,
      token,
      data: tokenInput,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

// register staff
export const registerStaff = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const { fullname, email, password, sex, address, phone, category } =
      req.body;

    if (
      !fullname ||
      !email ||
      !password ||
      !sex ||
      !address ||
      !phone ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: req.body,
      });
    }
    const image = await saveImage(req.file);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the staff member to the database
    const newStaff = await prisma.staffs.create({
      data: {
        fullname,
        email,
        password_hash: hashedPassword,
        sex,
        img: `uploads/${image}`,
        addr: address,
        phone,
        class: category,
        status: "0",
      },
    });

    res.status(201).json({
      success: true,
      data: "New Staff Created",
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};
