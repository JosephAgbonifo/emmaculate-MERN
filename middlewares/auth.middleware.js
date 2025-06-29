// auth.middleware.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export default function authenticateToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token missing in cookies" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded };
    req.role = decoded.role; // Assuming role is part of the token payload
    req.token = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
