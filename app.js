import express from "express";
import { NODE_ENV, PORT } from "./config/env.js";
import studentRoute from "./routes/student.route.js";
import adminRoute from "./routes/admin.route.js";
import resultRoute from "./routes/result.route.js";
import staffRoute from "./routes/staff.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

//Middlewares
app.use(errorMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/result", resultRoute);
app.use("/api/staff", staffRoute);

// home route
app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to the School Management System API</h1><h2>&copy;emmaculate college ${new Date().getFullYear()}</h2>`
  );
});

app.listen(PORT, () => {
  console.log(`${NODE_ENV} server running on port http://localhost:${PORT}`);
});
