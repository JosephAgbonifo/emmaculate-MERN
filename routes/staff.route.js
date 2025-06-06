import { Router } from "express";

const staffRoute = Router();

staffRoute.get("/", (req, res) => {
  res.send({ message: "Get all staff details" });
});

staffRoute.post("/", (req, res) => {
  res.send({ message: "Register staff route" });
});

staffRoute.get("/:id", (req, res) => {
  res.send({ message: `details of staff with ID: ${req.params.id}` });
});

staffRoute.put("/:id", (req, res) => {
  res.send({ message: `Update details of staff with ID: ${req.params.id}` });
});

staffRoute.delete("/:id", (req, res) => {
  res.send({ message: `Delete details of staff with ID: ${req.params.id}` });
});

export default staffRoute;
