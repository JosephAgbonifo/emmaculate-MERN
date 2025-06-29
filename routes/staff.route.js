import { Router } from "express";
import { getThisStaff, registerStaff } from "../controller/staff.controller.js";
import { uploadImage } from "../utils/upload/save.js";

const staffRoute = Router();

staffRoute.get("/", (req, res) => {
  res.send({ message: "Get all staff details" });
});

staffRoute.post("/", uploadImage, registerStaff);

staffRoute.post("/login", getThisStaff);

staffRoute.put("/:id", (req, res) => {
  res.send({ message: `Update details of staff with ID: ${req.params.id}` });
});

staffRoute.delete("/:id", (req, res) => {
  res.send({ message: `Delete details of staff with ID: ${req.params.id}` });
});

export default staffRoute;
