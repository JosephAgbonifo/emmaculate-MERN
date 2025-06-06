import { Router } from "express";

const resultRoute = Router();

resultRoute.get("/", (req, res) => {
  const query = req.query;
  res.send({
    message: `Get result details for ID: ${req.params.id} for term ${query.term} in session ${query.session}`,
  });
});

resultRoute.post("/", (req, res) => {
  res.send({
    message: "Register result route",
  });
});

export default resultRoute;
