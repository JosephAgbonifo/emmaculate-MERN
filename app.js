import express from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./config/env.js";
import studentRoute from "./routes/student.route.js";
import adminRoute from "./routes/admin.route.js";
import resultRoute from "./routes/result.route.js";
import staffRoute from "./routes/staff.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();
const app = express();

//Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://de-emmaculate-college.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(errorMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/result", resultRoute);
app.use("/api/staff", staffRoute);

app.get("/api/session", async (req, res, next) => {
  try {
    const activeSession = await prisma.session.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!activeSession) {
      return res.status(404).json({
        success: false,
        message: "No active session found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        session: activeSession.name,
        term: activeSession.term,
      },
    });
  } catch (err) {
    next(err);
  }
});

// home route
app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to the School Management System API</h1><h2>&copy;emmaculate college ${new Date().getFullYear()}</h2>`
  );
});

app.listen(PORT, () => {
  console.log(`${NODE_ENV} server running on port http://localhost:${PORT}`);
});
