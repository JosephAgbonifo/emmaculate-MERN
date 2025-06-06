import { Router } from "express";
import {
  getAdminController,
  getAdminsController,
} from "../controller/admin.controller.js";

const adminRoute = Router();

adminRoute.get("/", getAdminsController);

adminRoute.get("/:id", getAdminController);

adminRoute.post("/session", (req, res) => {
  res.send({ message: "Get admin session details" });
});

adminRoute.post("/", (req, res) => {
  res.send({ message: "Register admin route" });
});

adminRoute.put("/:id", (req, res) => {
  res.send({ message: `Update admin details for ID: ${req.params.id}` });
});

adminRoute.delete("/:id", (req, res) => {
  res.send({ message: `Delete admin details for ID: ${req.params.id}` });
});

export default adminRoute;
