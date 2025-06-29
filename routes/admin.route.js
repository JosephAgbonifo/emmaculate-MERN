import { Router } from "express";
import { updateSessionController } from "../controller/admin.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const adminRoute = Router();

// adminRoute.get("/", getAdminsController);

// adminRoute.get("/:id", getAdminController);

adminRoute.post("/session", authenticateToken, updateSessionController);

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
