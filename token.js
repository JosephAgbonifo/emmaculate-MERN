import jsonwebtoken from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "./config/env.js";
const createtoken = (input) => {
  return jsonwebtoken.sign(input, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

console.log(createtoken({ test: "test", user: "admin" }));
