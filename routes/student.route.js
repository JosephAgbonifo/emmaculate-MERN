import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getThisStudent,
  updateStudent,
} from "../controller/student.controller.js";
import { uploadImage } from "../utils/upload/save.js";

const studentRoute = Router();

studentRoute.get("/", getAllStudents);

studentRoute.get("/:reg_number", getThisStudent);

studentRoute.post("/", uploadImage, createStudent);

studentRoute.put("/:reg_number", updateStudent);

studentRoute.delete("/:reg_number", deleteStudent);

export default studentRoute;
