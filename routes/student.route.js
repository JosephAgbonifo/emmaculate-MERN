import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getThisStudent,
  updateStudent,
} from "../controller/student.controller.js";
import { uploadImage } from "../utils/upload/save.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const studentRoute = Router();

studentRoute.get("/", authenticateToken, getAllStudents);

studentRoute.post("/login", getThisStudent);

studentRoute.post("/", uploadImage, authenticateToken, createStudent);

studentRoute.put("/:reg_number", authenticateToken, updateStudent);

studentRoute.delete("/:reg_number", authenticateToken, deleteStudent);

export default studentRoute;
